import React, { Component } from 'react';
import { Container, Form, Item, Label, Input, Button, Text, Icon, Toast, Root} from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import * as firebase from "firebase";
import './ConnectFirebase';
// symbol polyfills
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');
// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

class Login extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: '',
            pass: '',
            showToast: false
        }
    }        
    Login(email, pass) {    
        try {
            firebase.auth()
                .signInWithEmailAndPassword(email.trim(), pass)
                .then((DataUser) => console.log(DataUser))
                .catch((error)=>{alert(error.toString())});
            // Navigate to the Home page    
        } catch (error) {
            console.log(error.toString())
        }    
    }   
    static navigationOptions = {
        header: null,   
    };
    render() {
      return (
        <Root>            
            <Container style={{ flex: 1, justifyContent: "center" }} androidStatusBarColor="#16a085">
                <Grid style={{flex:1}}>
                    <Row style={{flex:1}}></Row>    
                    <Row style={{flex:4}} >
                        <Form style={{width:'100%', backgroundColor:"#fff", color: "#333"}}>
                            <Item floatingLabel>
                                <Label>Username</Label>
                                <Input onChangeText={(user)=>{
                                    this.setState({user: user});
                                }}/>
                            </Item>
                            <Item floatingLabel last>
                                <Label>Password</Label>
                                <Input onChangeText={(Password)=>{
                                    this.setState({pass: Password});
                                }}/>
                            </Item>
                            <Button 
                                iconLeft light info full
                                onPress={() => this.Login(this.state.user, this.state.pass)}
                                style={{marginTop: 20}}
                            >
                                <Text style={{color:"#fff"}}>Login</Text>
                            </Button>
                            <Button 
                                iconLeft light success full
                                onPress={()=> this.props.navigation.navigate('SignUp')}
                                style={{marginTop: 20}}
                            >
                                <Text style={{color:"#fff"}}>SignUp</Text>
                            </Button>
                            <Button 
                                iconLeft light full primary
                                onPress={()=> this.props.navigation.navigate('Home')}
                                style={{marginTop: 20}}
                            >
                                <Icon name='sc-facebook' type='EvilIcons' style={{color:"#fff"}}/>
                                <Text style={{color:"#fff"}}>Login By FaceBook</Text>
                            </Button> 
                        </Form>                    
                    </Row> 
                    <Row style={{flex:1}}></Row>
                </Grid>            
            </Container>        
        </Root>
      );
    }
}
export default Login;