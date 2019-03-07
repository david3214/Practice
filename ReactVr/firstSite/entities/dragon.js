import React from 'react';
import {
  asset
} from 'react-360';
import Entity from 'Entity'
// import dragon from './entities/dragon'
export default class dragon extends React.Component {
  constructor(props){
    super(props)
    console.log("Dragon")
  }
  render() {
    return (
      <Entity
        source={{
          obj: asset('./smaug/smaug.obj'),
          /* mtl: asset('./smaug/smaug.mtl') */}}
        style={{
          transform:[
            {rotateY: 0},
            {rotateZ: 0},
            // {translateX: 50},
            // {translateY: -30},
            {translateZ: -350},
            {scaleY: 10},
            {scaleX: 10},
            {scaleZ: 10},
          ]
        }}
      />
    );
  }
};
