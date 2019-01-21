import React, { Component } from 'react';
import {Header, Button, Icon, Body, Title, Right } from 'native-base';

class AppHeader extends Component {
  render() {
    return (      
        <Header style={{backgroundColor:"#16a085"}} androidStatusBarColor="#16a085"> 
            <Body>
                <Title>Logo</Title>
            </Body>
            <Right>
                <Button transparent onPress={()=> this.props.Navigation.navigate('Filter')}>
                  <Icon name="dots-three-vertical" type="Entypo" />
                </Button>
            </Right>
        </Header>
    );
  }
}
export default AppHeader;        