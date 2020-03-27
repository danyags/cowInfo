import React from 'react';
import {StyleSheet, Image, View, ScrollView} from 'react-native';
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

export function Login({navigation}) {
  return (
    <ScrollView>
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
            />
          </Item>
          <Item floatingLabel style={stylesLogin.inputMargins}>
            <Label>Contraseña</Label>
            <Input
              autoCapitalize="none"
              secureTextEntry={true}
              returnKeyType="go"
              ref={component => (this.Password = component)}
            />
          </Item>
          <View style={stylesLogin.btnContainerLogin}>
            <Button
              rounded
              block
              onPress={() => navigation.navigate('Dashboard')}>
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