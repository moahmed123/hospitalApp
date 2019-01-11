import React, { Component } from 'react';
import { Container, Content, Button, Text, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';


class Login extends Component {
    static navigationOptions = {
        header: null,   
    };
    render() {
      return (
        <Container style={{ flex: 1, justifyContent: "center", backgroundColor:"#ddd" }}>                        
            <Grid style={{flex:1}}>
                <Row style={{flex:2}}></Row>
                <Row style={{alignItems: "center", justifyContent: "center", flex:1 }}>
                    <Button iconLeft light 
                        onPress={()=> this.props.navigation.navigate('Home')}>
                        <Icon name='sc-facebook' type='EvilIcons' />
                            <Text>Login By FaceBook</Text>
                    </Button> 
                </Row> 
                <Row style={{flex:2}}></Row>                      
            </Grid>            
        </Container>        
      );
    }
}
export default Login;