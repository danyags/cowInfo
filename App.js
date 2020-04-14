// In App.js in a new project

import * as React from 'react';
//import {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
//import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//import * as LoginScreen from './src/components/Login';
//import * as DashboardScreen from './src/components/Dashboard';
//import TestFile from './src/components/TestFile';
import LoginScreen from './src/components/LoginScreen';
import DashboardScreen from './src/components/DashboardScreen';
import LoadingScreen from './src/components/LoadingScreen';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();
const StackLoading = createStackNavigator();
const StackLogged = createStackNavigator();
const StackNoLogged = createStackNavigator();

/*function callLoading() {
  return (
    <StackLoading.Navigator>
      <StackLoading.Screen
        name="LoadingScreen"
        component={LoadingScreen}
        options={{headerShown: false}}
      />
    </StackLoading.Navigator>
  );
}

function callNoLogged() {
  return (
    <StackLogged.Navigator>
      <StackLogged.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </StackLogged.Navigator>
  );
}

function callLogged() {
  return (
    <StackNoLogged.Navigator>
      <StackNoLogged.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{headerShown: false}}
      />
    </StackNoLogged.Navigator>
  );
}*/

const CallLoading = () => (
  <StackLoading.Navigator>
    <StackLoading.Screen
      name="LoadingScreen"
      component={LoadingScreen}
      options={{headerShown: false}}
    />
  </StackLoading.Navigator>
);

const CallNoLogged = () => (
  <StackLogged.Navigator>
    <StackLogged.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{headerShown: false}}
    />
  </StackLogged.Navigator>
);

const CallLogged = () => (
  <StackNoLogged.Navigator>
    <StackNoLogged.Screen
      name="DashboardScreen"
      component={DashboardScreen}
      options={{headerShown: false}}
    />
  </StackNoLogged.Navigator>
);

function App() {
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  //const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    /*if (token) {
      setLoggedIn(true);
      console.log(isLoggedIn);
    }*/

    async function verifyLogin() {
      setTimeout(() => {
        setIsLoading(!isLoading);
        //setUser({});
      }, 500);
      let t;
      try {
        t = await AsyncStorage.getItem('isLogged');
        if (t !== null) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (e) {
        console.log('Error');
      }
      setIsLoading(!isLoading);
    }
    verifyLogin();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <CallLoading />
      ) : isLoggedIn === false ? (
        <CallNoLogged />
      ) : (
        <CallLogged />
      )}
    </NavigationContainer>
  );
}

export default App;
