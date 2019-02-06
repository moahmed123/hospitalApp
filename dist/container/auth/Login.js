import React, { Component } from 'react';
import { Container, Form, View, Item, Label, Input, Button, Text, Icon, Thumbnail, Root, Content} from 'native-base';
import {AsyncStorage, ImageBackground} from 'react-native';
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
        this.Login = this.Login.bind(this);
    }        
    Login(email, pass) {    
        try {
            firebase.auth()
                .signInWithEmailAndPassword(email.trim(), pass)                
                .then((user) => {
                    const  token =  user['user']['refreshToken'];   
                    const  email =  user['user']['email'];                    
                    AsyncStorage.multiSet([
                        ["app_Token", token],
                        ["email_user", email]
                    ]).then(()=>{
                        this.props.navigation.navigate('Home');
                    });
                })
                .catch((error)=>{alert(error.toString())});            
        }catch(error) {
            console.log(error.toString())
        }            
    }   
    static navigationOptions = {
        header: null,   
    };
    render() {
      return (
        <Root>            
            <Container style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center', backgroundColor:"#16a085"}} androidStatusBarColor="#16a085">
            <ImageBackground                 
                source={require('./../../src/backgroundLogin.jpg')}                
                style={{resizeMode: 'cover',flex: 1}} 
            >
            {/* , marginHorizontal: "5%"  borderRadius: 5,*/}
                <Content style={{backgroundColor:"rgba(242, 242, 242, 0.84)", padding: 20}}>
                    <View style={{ justifyContent: 'center',alignItems: 'center', paddingVertical: 20}}>
                        <Thumbnail 
                            square large 
                            style={{resizeMode: 'contain', width: 150, height: 130}}
                            source={require('./../../src/hospital-icon.png')} 
                        />
                    </View>                    
                    <Form style={{width:'100%', color: "#333"}}>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input onChangeText={(user)=>{
                                this.setState({user: user});
                            }}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input  
                                secureTextEntry                                     
                                onChangeText={(Password)=>{
                                this.setState({pass: Password});
                            }}/>
                        </Item>
                        <Button 
                            light info full rounded
                            onPress={() => this.Login(this.state.user, this.state.pass)}
                            style = {{marginTop: 45, backgroundColor: '#16a085'}}
                        >                            
                            <Text style = {{color:"#fff"}}>Login</Text>                            
                        </Button>
                        
                        <Button 
                            hasText transparent
                            onPress={()=> this.props.navigation.navigate('SignUp')}
                            style = {{marginTop: 5,  textTransform:"capitalize"}}
                        >                            
                            <Text style={{color:"#aaa", textTransform:"capitalize"}}>
                                Don't have an account? 
                                <Text style={{color:"#16a085",  textTransform:"uppercase"}}> SignUp </Text>
                            </Text>
                        </Button>                         
                    </Form>   
                </Content>                           
            </ImageBackground>
            </Container>        
        </Root>
      );
    }
}
export default Login;