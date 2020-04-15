//import liraries
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
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

// create a component
const DashboardScreen = ({signOut}) => {
  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Dashboard</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Button rounded block onPress={signOut}>
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
};

// define your styles

//make this component available to the app
export default DashboardScreen;
