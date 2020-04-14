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

// create a component
const LoginScreen = ({navigation, helper}) => {
  const [usr, setUsr] = React.useState('');
  const [psw, setPsw] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [flag, setFlag] = React.useState(false);

  function login(u, p) {
    Keyboard.dismiss();
    //alert(usr + " " + psw);
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
          if (response.Response === 'Go') {
            AsyncStorage.setItem('isLogged', 'yes');
            //navigation.push('DashboardScreen');
            //navigation.dispatch(StackActions.push('DashboardScreen'));
            navigation.dispatch(
              CommonActions.reset({index: 0, routes: [{name: 'Home'}]}),
            );
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
        <View style={stylesLogin.containerLogo}>
          <Image
            source={require('../img/cow1.png')}
            style={stylesLogin.imageLogo}
          />
          <Text style={stylesLogin.titleApp}>Cow monitor</Text>
        </View>
        <Content>
          <Item stackedLabel style={stylesLogin.inputMargins}>
            <Label>Usuario</Label>

            <Input
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="next"
              autoCorrect={false}
              onChangeText={setUsr}
              //onChangeText={usr => this.setState({usr})}
            />
          </Item>
          <Item stackedLabel style={stylesLogin.inputMargins}>
            <Label>Contraseña</Label>
            <Input
              autoCapitalize="none"
              secureTextEntry={true}
              returnKeyType="go"
              onChangeText={setPsw}
              //onChangeText={pass => this.setState({pass})}
            />
          </Item>
          <Display enable={flag}>
            <View
              style={{
                paddingTop: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'red'}}>
                {/*this.state.errorText*/ message}
              </Text>
            </View>
          </Display>
          <View style={stylesLogin.btnContainerLogin}>
            <Button
              uppercase={false}
              rounded
              block
              //onPress={() =>
              //this.props.navigation.navigate('DashboardScreen')
              //}>
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
  inputMargins: {marginLeft: 30, marginRight: 30},
  btnContainerLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    marginLeft: 80,
    marginRight: 80,
  },
});

//make this component available to the app
export default LoginScreen;
