import React from 'react';
import {StyleSheet, Image, View, ScrollView, Keyboard} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Item,
  Input,
  Label,
  Toast
} from 'native-base';

/*export const Login = ({navigation}) => (
  <Container>
    <Header>
      <Left />
      <Body>
        <Title onPress={() => navigation.navigate('Dashboard')}>
          Pantalla de login
        </Title>
      </Body>
      <Right />
    </Header>
    <Content>
      <Text>Contenido alv</Text>
    </Content>
    <Footer>
      <FooterTab>
        <Button full>
          <Text>Pie de página</Text>
        </Button>
      </FooterTab>
    </Footer>
  </Container>
);*/

function loginApp(u,p){
  Keyboard.dismiss();
  
  if(String(u).trim().length != 0 && String(p).trim().length !=0)
  {
    alert(u + " " + p);
  }
  else
  {
    alert("Completa los campos para iniciar sesión");
  }
}

export function Login({navigation}) {
  const [userData, onChangeTextUsr] = React.useState('');
  const [passData, onChangeTextPass] = React.useState(''); 

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Container>
        {/*<Header>
        <Left />
        <Body>
          <Title onPress={() => navigation.navigate('Dashboard')}>
            Pantalla de login
          </Title>
        </Body>
        <Right />
      </Header>*/}
        <View style={stylesLogin.containerLogo}>
          <Image
            source={require('../img/cow.png')}
            style={stylesLogin.imageLogo}
          />
          <Text style={stylesLogin.titleApp}>Cow monitor</Text>
        </View>
        <Content>
          <Item floatingLabel style={stylesLogin.inputMargins}>
            <Label>Usuario</Label>

            <Input
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="next"
              autoCorrect={false}
              onChangeText={text => onChangeTextUsr(text)}
            />
          </Item>
          <Item floatingLabel style={stylesLogin.inputMargins}>
            <Label>Contraseña</Label>
            <Input
              autoCapitalize="none"
              secureTextEntry={true}
              returnKeyType="go"
              //ref={component => (this.Password = component)}
              onChangeText={text => onChangeTextPass(text)}
            />
          </Item>
          <View style={stylesLogin.btnContainerLogin}>
            <Button
              rounded
              block
              //onPress={() => navigation.navigate('Dashboard')}>
              onPress={() => loginApp(userData, passData)}>
              <Text>Iniciar sesión</Text>
            </Button>
          </View>
        </Content>
        {/*<Footer>
          <FooterTab>
            <Button full>
              <Text>Pie de página</Text>
            </Button>
          </FooterTab>
        </Footer>*/}
      </Container>
    </ScrollView>
  );
}

const stylesLogin = StyleSheet.create({
  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  imageLogo: {width: 200, height: 200},
  titleApp: {fontSize: 24, fontWeight: 'bold'},
  inputMargins: {marginLeft: 30, marginRight: 30},
  btnContainerLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    marginLeft: 80,
    marginRight: 80,
  },
});