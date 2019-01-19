import React, { Component } from 'react';
import {Container, Content, Text } from 'native-base';
import AppHeader from "./../AppHeader";

class Destination extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (      
        <Container>              
          <AppHeader Navigation = {this.props.navigation}/>
          <Content>
            <Text style={{ paddingTop: 60}}> Map Page </Text>             
          </Content>          
        </Container>
    );
  }
}
export default Destination;