// In App.js in a new project

import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  Keyboard,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/components/LoginScreen';
import DashboardScreen from './src/components/DashboardScreen';
import LoadingScreen from './src/components/LoadingScreen';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();
const StackLoading = createStackNavigator();
const StackLogged = createStackNavigator();
const StackNoLogged = createStackNavigator();

const AuthContext = React.createContext();

function SplashScreen() {
  return <LoadingScreen />;
}

function HomeScreen() {
  const {signOut} = React.useContext(AuthContext);
  return <DashboardScreen signOut={signOut} />;
}

function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {signIn} = React.useContext(AuthContext);

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => signIn({username, password})} />
    </View>
  );
}

export default function App({navigation}) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('isLogged');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        //alert(JSON.stringify(data))
        if (
          String(data.username).trim().length != 0 &&
          String(data.password).trim().length != 0
        ) {
          Keyboard.dismiss();
          if (
            String(data.username).trim().length != 0 &&
            String(data.password).trim().length != 0
          ) {
            //handleMessageErrorFunction('Verificando datos', true);
            let formInfo = new FormData();
            formInfo.append('action', 'login');
            formInfo.append('u', data.username);
            formInfo.append('p', data.password);

            fetch('http://192.168.1.71:8080/dispositivo/userActions.php', {
              method: 'POST',
              headers: {
                'Content-type': 'multipart/form-data',
              },
              body: formInfo,
            })
              .then(response => response.json())
              .then(response => {
                if (response.Response === 'Go') {
                  AsyncStorage.setItem('isLogged', 'yes');
                  //navigation.push('DashboardScreen');
                  //navigation.dispatch(StackActions.push('DashboardScreen'));
                  dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
                } else {
                  //handleMessageErrorFunction('Datos de acceso incorrectos', true);
                  alert('Datos de acceso incorrectos');
                }
              })
              .catch(error => {
                alert(error);
              });
          } else {
            alert('Completa los campos del formulario');
            //handleMessageErrorFunction('Completa los campos del formulario', true);
          }
          /*setTimeout(() => {
            handleMessageErrorFunction('', false);
          }, 3000);*/

          //dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
        } else {
          alert("NO PASS");
        }
      },
      signOut: async () => {
        await AsyncStorage.removeItem('isLogged');
        dispatch({type: 'SIGN_OUT', token: null});
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{headerShown: false}}
            />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: 'Sign in',
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                headerShown: false,
              }}
            />
          ) : (
            // User is signed in
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
