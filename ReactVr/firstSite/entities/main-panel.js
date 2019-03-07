import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
  Environment,
  asset,
  AmbientLight,
  PointLight
} from 'react-360';
import VideoModule from 'VideoModule'
import Entity from 'Entity'
import Earth from './earth'

export default class MainPanel extends React.Component {
  state = {
    count: 0,
    image: [ 'background.jpg', 'StreetBig.png', 'southLooking.png'],
    curIndex: 0,
    earth:{
      rotateY: 0,
      spinning: false
    }
  }
  componentDidMount(){
    this.interval = undefined
  }
  componentWillUnmount(){
    clearInterval(this.interval)
  }
  triggerSpin = async()=>{
    console.log(this.state)
    if(this.state.earth.spinning){
      clearInterval(this.interval)
    }else{
      this.interval = setInterval(()=> this.rotate(), 10)
      console.log("StartSpin", this.interval)
    }
    await this.setState({earth: {rotateY: this.state.earth.rotateY, spinning: !this.state.earth.spinning}})
    console.log("finished triggerSpin")
  }
  rotate = async()=>{
    console.log("Rotate:", this.state)
    await this.setState({earth: {rotateY: this.state.earth.rotateY + 0.25, spinning: this.state.earth.spinning}})
  }
  _incrementCount = ()=>{
    this.setState({count: this.state.count + 1})
  }
  _changeBackground = async()=>{
    //This should work, but I'm missing something
    if(this.state.curIndex >= this.state.image.length - 1)
      await this.setState({curIndex: 0})
    else
      await this.setState({curIndex: this.state.curIndex + 1})
    Environment.setBackgroundImage(asset(this.state.image[this.state.curIndex]))
  }
  _clearBackground = ()=>{
    Environment.clearBackground()
  }
  _startMovie = ()=>{
    console.log("I've been Hit")
    const player = VideoModule.createPlayer('London')
    VideoModule.play('London', {
      source: {url: '/static_assets/London.mp4'},
      muted: false
    })
    
    Environment.setBackgroundVideo('London')
  }
  render() {
    return (
      <View style={styles.panel}>
        <AmbientLight intesity={1.0} color='#fffff'/>
        <PointLight intensity={0.4} style={{ transform: [{ translate: [0, 4, -1] }] }}/>
        <VrButton
          onClick={this._incrementCount}
          style={styles.greetingBox}>
          <Text style={styles.greeting}>
            {`Count: ${this.state.count}`}
          </Text>
        </VrButton>
        <VrButton
          onClick={this._changeBackground}
          style={styles.greetingBox}>
          <Text style={styles.greeting}>
            {`Change the Background`}
          </Text>
        </VrButton>
        <VrButton
          onClick={this._clearBackground}
          style={styles.greetingBox}>
          <Text style={styles.greeting}>
            {`Clear the Background`}
          </Text>
        </VrButton>
        <VrButton 
        onClick={this._startMovie}
        style={styles.greetingBox}>
          <Text style={styles.greeting}>
            {`Start Movie`}
          </Text>
        </VrButton>
        <Earth transform={[
          {rotateY: this.state.earth.rotateY},
          {rotateZ: 0},
          {rotateX: 0},
          {translate: [50,0,0]},
          {scaleY: .1},
          {scaleX: .1},
          {scaleZ: .1},
        ]}/>
        <VrButton 
        onClick={this.triggerSpin}
        style={styles.greetingBox}>
          <Text style={styles.greeting}>
            {`Trigger Rotation`}
          </Text>
        </VrButton>
      </View>
    );
  }
};

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
});