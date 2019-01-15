import React, { Component } from 'react';
import {Header, Left, Button, Icon, Body, Title, Right } from 'native-base';

class AppHeader extends Component {
  render() {
    return (      
        <Header>
            <Left>
                <Button transparent>
                  <Icon name='menu' />
                </Button>
            </Left>
            <Body>
                <Title>Header</Title>
            </Body>
            <Right />
        </Header>
    );
  }
}
export default AppHeader;        