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
import Display from 'react-native-display';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usr: '',
      pass: '',
      errorFlag: false,
      errorText: '',
    };
    this.isLoggedFunction().done();
  }

  handleMessageErrorFunction = (message, flag) => {
    this.setState({errorFlag: flag, errorText: message});
  }

  isLoggedFunction = async () => {
    var value = await AsyncStorage.getItem('isLogged');
    //await AsyncStorage.removeItem('isLogged');
    if (value !== null) {
      this.props.navigation.dispatch(StackActions.replace('DashboardScreen'));
    }
  };

  loginFunction = () => {
    const {usr, pass} = this.state;
    Keyboard.dismiss();
    //192.168.1.71

    if (String(usr).trim().length != 0 && String(pass).trim().length != 0) {
      this.handleMessageErrorFunction('Verificando datos', true);
      let formInfo = new FormData();
      formInfo.append('action', 'login');
      formInfo.append('u', usr);
      formInfo.append('p', pass);

      fetch('http://192.168.1.71:8080/dispositivo/userActions.php', {
        method: 'POST',
        headers: {
          //'Content-type':'application/x-www-form-urlencoded'
          'Content-type': 'multipart/form-data',
        },
        body: formInfo,
      })
        .then(response => response.json())
        .then(response => {
          if (response.Response == 'Go') {
            AsyncStorage.setItem('isLogged', 'yes');
            this.props.navigation.dispatch(
              StackActions.replace('DashboardScreen'),
            );
          } else {
            this.handleMessageErrorFunction(
              'Datos de acceso incorrectos',
              true,
            );
            /*this.setState({
              errorText: 'Datos de acceso incorrectos',
              errorFlag: true,
            });*/
          }
        })
        .catch(error => {
          alert(error);
        });
    } else {
      this.handleMessageErrorFunction(
        'Completa los campos del formulario',
        true,
      );
      /*this.setState({
        errorText: 'Completa los campos del formulario',
        errorFlag: true,
      });*/
    }
    setTimeout(() => {
      this.handleMessageErrorFunction('', false);
    }, 6000);
  };

  render() {
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
                onChangeText={usr => this.setState({usr})}
              />
            </Item>
            <Item stackedLabel style={stylesLogin.inputMargins}>
              <Label>Contraseña</Label>
              <Input
                autoCapitalize="none"
                secureTextEntry={true}
                returnKeyType="go"
                onChangeText={pass => this.setState({pass})}
              />
            </Item>
            <Display enable={this.state.errorFlag}>
              <View style={{paddingTop:15,justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'red'}}>{this.state.errorText}</Text>
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
                onPress={() => this.loginFunction()}>
                <Text uppercase={false}>INICIAR SESIÓN</Text>
              </Button>
            </View>
          </Content>
        </Container>
      </ScrollView>
    );
  }
}
const stylesLogin = StyleSheet.create({
  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
    paddingTop: 50
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
