import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-360';

export default class hacknight3 extends React.Component {
  render() {
    return (
      <View style={styles.panel}>
        <View style={styles.greetingBox}>
          <Text style={styles.greeting}>
            Welcome to React 360
          </Text>
        </View>
				<View style={styles.greetingBox}>
          <Text style={styles.greeting}>
            {this.state.images[this.state.index % this.state.images.length]}
          </Text>
        </View>
				<View style={styles.greetingBox}>
          <Text style={styles.greeting}>
            Welcome to React 360
          </Text>
        </View>
				<View style={styles.greetingBox}>
          <Text style={styles.greeting}>
            Welcome to React 360
          </Text>
        </View>
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
		// justifyContent: 'left',
		flexDirection: 'row',
		alignItems: 'flex-start',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
		borderWidth: 2,
		width: '25%',
  },
  greeting: {
    fontSize: 30,
  },
});

AppRegistry.registerComponent('hacknight3', () => hacknight3);
