import React from 'react';
import {
  asset
} from 'react-360';
import Entity from 'Entity'

export default class TestModel extends React.Component {
  /* constructor(props){
    super(props)
    console.log("Style:", this)
  } */
  render() {
    return (
      <Entity
        source={{
          gltf2: asset('car.gltf')}}
        style={{
          transform: [
            {rotateY: 0},
            {rotateZ: 0},
            {rotateX: 0},
            {translate: [0,0,-25]},
            {scaleY: .1},
            {scaleX: .1},
            {scaleZ: .1},
          ]
        }}
      />
    );
  }
};