const { makeExecutableSchema } = require('graphql-tools')
const { gql } = require('apollo-server-lambda')

const { getGeoCodeClient } = require('./MapBoxService')
const { onLink } = require('./contacts.link')
const { AddressInput } = require('../common')

const AddressType = {
  SHIPPING: 1,
  BILLING: 2
}
const PhoneType = {
  CELL: 1,
  HOME: 2,
  BUSINESS: 3
}

const typeDefs = gql`
  ${AddressInput}

  type PhoneNumber {
    id: Int!
    number: String!
  }

  input ContactNumberInput {
    id: Int!
    number: String!
  }

  input MemberOrTenantInput {
    memberId: Int
    tenantId: Int
  }

  input MemberPhoneInput {
    memberId: Int!
    number: String!
    type: String!
  }

  type Address {
    id: Int
    name: String!
    street: String!
    street2: String
    city: String!
    province: String
    postalCode: String!
    country: String!
    type: String
    lat: Float
    long: Float
  }

  enum AddressType {
    SHIPPING
    BILLING
  }

  type Mutation {
    updateAddress(input: AddressInput): Address!
    updatePhoneNumber(input: ContactNumberInput!): PhoneNumber
    createPhoneByMember(input: MemberPhoneInput!): PhoneNumber
  }

  type Query {
    allAddresses(input: MemberOrTenantInput): [Address]
    phoneNumberByMember(input: MemberOrTenantInput): [PhoneNumber]!
    addressByMemberOrTenant(input: MemberOrTenantInput): [Address]!
  }
  #  TODO: member should have a link to addresses
`

// Provide resolver functions for your schema fields
const resolvers = {
  AddressType: AddressType,

  Query: {
    allAddresses: async (root, { input }, { dbo }) => {
      const { rows } = await dbo.contacts.allAddresses(input)
      return rows
    },
    addressByMemberOrTenant: async (root, { input }, { dbo }) => {
      const query = input.memberId ? 'addressByMemberId' : 'addressByTenantId'
      const { rows } = await dbo.contacts[query](input)
      return rows
    },
    phoneNumberByMember: async (root, { input }, { dbo }) => {
      const { rows } = await dbo.contacts.phoneByMemberId({
        memberId: input.memberId
      })
      return rows
    }
  },
  Mutation: {
    updatePhoneNumber: async (root, { input }, { dbo, user }) => {
      const { id, number } = input
      const { rows } = await dbo.contacts.updatePhone({ id, number })
      return rows && rows.length ? rows[0] : null
    },
    updateAddress: async (root, { input }, { dbo, user }) => {
      // TODO security: make sure if memberId != user.memberId we fix that

      const { body } = await getGeoCodeClient(user.tenantId)
        .forwardGeocode({
          query: `${input.street} ${input.street2} ${input.city} ${
            input.province
          } ${input.postalCode} ${input.country}`,
          limit: 1
        })
        .send()
      const geometry = body.features[0].geometry
      let address = null
      if (input.id) {
        console.warn('Updating address', input.id)
        const { rows } = await dbo.contacts.updateAddress({
          long: geometry.coordinates[0],
          lat: geometry.coordinates[1],
          street2: undefined,
          ...input
        })
        address = rows[0]
      } else {
        console.warn('Creating address', input.memberId)
        const { rows } = await dbo.contacts.createAddressByMemberId({
          long: geometry.coordinates[0],
          lat: geometry.coordinates[1],
          street2: undefined,
          type: 1,
          ...input
        })
        address = rows[0]
      }
      return address
    },
    createPhoneByMember: async(root, {input}, {dbo, user})=>{
      //Review Phone Type, see if we need it as an input -------!
      let {memberId, number, type} = input
      type = PhoneType[type]
      //Check if the user already has a phone
      const doesExist = await dbo.contacts.phoneByMemberId({memberId})
      if (doesExist.rows && doesExist.rows.length){
        throw new Error('User already has a phone')
      } else{
        //if the user doesn't have a phone, create one.
        const {rows} = await dbo.contacts.createPhoneByMemberId({memberId, number, phoneType: type})
        if (rows && rows.length){
          //Return the phone number just created with its id
          const phoneNumber = await dbo.contacts.phoneByMemberId({memberId})
          return phoneNumber.rows && phoneNumber.rows.length ? phoneNumber.rows[0] : null
        }
      }
      return null
    }
  }
}

module.exports = {
  schema: makeExecutableSchema({
    typeDefs,
    resolvers
  }),
  onLink
}
