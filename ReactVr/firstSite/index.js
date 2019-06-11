import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-360';
import MainPanel from './entities/main-panel'
import Earth from './entities/earth'
import TestModel from './entities/testModel'

export default class firstSite extends React.Component {
  constructor(props){
    super(props)
    console.log("firstSite")
  }
  render() {
    return (
      <View>
        {/* <Earth transform={[
            {rotateY: 0},
            {rotateZ: 0},
            {rotateX: 0},
            {translate: [0,0,-50]},
            {scaleY: .25},
            {scaleX: .25},
            {scaleZ: .25},
          ]}/> */}
      </View>
    );
  }
};

AppRegistry.registerComponent('MainPanel', ()=> MainPanel)
AppRegistry.registerComponent('firstSite', () => firstSite)
// AppRegistry.registerComponent('TestModel', () => TestModel)