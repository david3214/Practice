import React from 'react';
import {
  asset
} from 'react-360';
import Entity from 'Entity'

export default class Earth extends React.Component {
  /* constructor(props){
    super(props)
    console.log("Style:", this)
  } */
  render() {
    return (
      <Entity
        source={{
          obj: asset('./earth/earth.obj'),
          mtl: asset('./earth/earth.mtl')}}
        style={{
          transform: this.props.transform
        }}
      />
    );
  }
};
/* 
const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  }, 
  // testStyle:{
  //   padding: 50,
  //   position: relative,
  //   left: 30,
  //   backgroundColor: 'blue',
  //   borderColor: 'green',
  //   borderWidth: 2,
  // },
}); */