import React, {Component} from 'react';
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
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {StackActions} from '@react-navigation/native';
export default class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  isLoggedFunction = async () => {
    await AsyncStorage.removeItem('isLogged');
    //this.props.navigation.dispatch(StackActions.replace('LoginScreen'));
  };

  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title
              onPress={() => this.props.navigation.navigate('LoginScreen')}>
              Dashboard
            </Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Button
            rounded
            block
            //onPress={() =>
            //this.props.navigation.navigate('DashboardScreen')
            //}>
            onPress={this.props.signOut}>
            <Text>salir</Text>
          </Button>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Pie de página</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
