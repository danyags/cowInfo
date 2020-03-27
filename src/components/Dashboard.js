import React from 'react';
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

export function Dashboard({navigation}) {
  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title onPress={() => navigation.navigate('Login')}>Dashboard</Title>
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
  );
}
