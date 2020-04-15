//import liraries
import React, {Component} from 'react';
import {StyleSheet, Image, View, ScrollView, Keyboard} from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  Item,
  Input,
  Label,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {StackActions} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import Display from 'react-native-display';
import * as Animatable from 'react-native-animatable';

// create a component
const LoginScreen = ({
  signIn,
  setUsername,
  setPassword,
  username,
  password,
}) => {
  const [usr, setUsr] = React.useState('');
  const [psw, setPsw] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [flag, setFlag] = React.useState(false);

  function login(u, p) {
    Keyboard.dismiss();
    if (String(u).trim().length != 0 && String(p).trim().length != 0) {
      handleMessageErrorFunction('Verificando datos', true);
      let formInfo = new FormData();
      formInfo.append('action', 'login');
      formInfo.append('u', u);
      formInfo.append('p', p);

      fetch('http://192.168.1.71:8080/dispositivo/userActions.php', {
        method: 'POST',
        headers: {
          'Content-type': 'multipart/form-data',
        },
        body: formInfo,
      })
        .then(response => response.json())
        .then(response => {
          /*if (response.Response === 'Go') {
            AsyncStorage.setItem('isLogged', 'yes');
            setUsername(u);
            setPassword(p);
            signIn({username, password});
          } else {
            handleMessageErrorFunction('Datos de acceso incorrectos', true);
          }*/
          if (response.length > 0) {
            AsyncStorage.setItem('isLogged', 'yes');
            AsyncStorage.setItem(
              'idRanch',
              response[0]['tbl_usuarios_idUsuario'],
            );
            setUsername(u);
            setPassword(p);
            signIn({username, password});
          } else {
            handleMessageErrorFunction('Datos de acceso incorrectos', true);
          }
        })
        .catch(error => {
          alert(error);
        });
    } else {
      handleMessageErrorFunction('Completa los campos del formulario', true);
    }
    setTimeout(() => {
      handleMessageErrorFunction('', false);
    }, 3000);
  }

  function handleMessageErrorFunction(m, f) {
    setMessage(m);
    setFlag(f);
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Container>
        <Animatable.View style={stylesLogin.containerLogo} animation={'bounceInDown'}>
          <Image
            source={require('../img/cow1.png')}
            style={stylesLogin.imageLogo}
          />
          <Text style={stylesLogin.titleApp}>Cow monitor</Text>
        </Animatable.View>
        <Content>
          <Item stackedLabel style={stylesLogin.inputMargins}>
            <Label style={stylesLogin.inputLabel}>Usuario</Label>

            <Input
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="next"
              autoCorrect={false}
              onChangeText={setUsr}
            />
          </Item>
          <Item stackedLabel style={stylesLogin.inputMargins}>
            <Label style={stylesLogin.inputLabel}>Contraseña</Label>
            <Input
              autoCapitalize="none"
              secureTextEntry={true}
              returnKeyType="go"
              onChangeText={setPsw}
            />
          </Item>
          <Display enable={flag}>
            <View style={stylesLogin.errorMessage}>
              <Text style={stylesLogin.textError}>{message}</Text>
            </View>
          </Display>
          <View style={stylesLogin.btnContainerLogin}>
            <Button
              uppercase={false}
              primary
              rounded
              block
              onPress={() => login(usr, psw)}>
              <Text uppercase={false}>INICIAR SESIÓN</Text>
            </Button>
          </View>
        </Content>
      </Container>
    </ScrollView>
  );
};

// define your styles
const stylesLogin = StyleSheet.create({
  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
    paddingTop: 50,
  },
  imageLogo: {width: 300, height: 200},
  titleApp: {fontSize: 24, fontWeight: 'bold'},
  inputMargins: {marginLeft: 30, marginRight: 30, borderBottomColor: '#000'},
  btnContainerLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    marginLeft: 80,
    marginRight: 80,
  },
  inputLabel: {color: '#000', fontWeight: 'bold'},
  errorMessage: {
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    color: 'red',
  },
});

//make this component available to the app
export default LoginScreen;
