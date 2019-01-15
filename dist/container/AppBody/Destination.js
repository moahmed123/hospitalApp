import React, { Component } from 'react';
import {Container, Content, Text } from 'native-base';
import AppHeader from "./../AppHeader";
import AppFooter from "./../AppFooter";

class Destination extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (      
        <Container>              
          <AppHeader/>
          <Content>
            <Text style={{ paddingTop: 60}}> Map Page </Text>            
          </Content>
          <AppFooter Navigation = {this.props.navigation}/>
        </Container>
    );
  }
}
export default Destination;