//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

// create a component
const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Animatable.Text
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
        style={{ fontSize:40}}>
        ⏳
      </Animatable.Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    /*backgroundColor: '#2c3e50',*/
  },
});

//make this component available to the app
export default LoadingScreen;
