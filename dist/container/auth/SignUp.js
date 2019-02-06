import React, { Component } from 'react';
import { Container, Form, Item, Label, Input, Button, Text, Toast, Root} from 'native-base';
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

class SignUp extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: '',
            pass: '',
            showToast: false
        }
    }    
    SignUp(email, pass) {
        try {
            firebase.auth()
                .createUserWithEmailAndPassword(email.trim(), pass)
                .then(() => 
                    Toast.show({
                        text: "Done registration",                        
                        duration: 3000,
                        type: "success" 
                    })
                )
                .catch((error)=>{alert(error.toString())});
                // Navigate to the Home page, the user is auto logged in
        }catch (error) {
            console.log(error.toString())
        }
    }       
    // static navigationOptions = {
    //     header: null,   
    // };
    render() {
      return (
        <Root>
            <Container style={{ flex: 1, justifyContent: "center" }}>                        
                <Grid style={{flex:1}}>
                    <Row style={{flex:1}}></Row>    
                    <Row style={{flex:4}} >
                        <Form style={{width:'100%', backgroundColor:"#fff", color: "#333"}}>
                            <Item floatingLabel>
                                <Label>Email</Label>
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
                                iconLeft light success full
                                onPress={()=> this.SignUp(this.state.user, this.state.pass)}
                                style={{marginTop: 20}}
                            >
                                <Text style={{color:"#fff"}}>SignUp</Text>
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
export default SignUp;