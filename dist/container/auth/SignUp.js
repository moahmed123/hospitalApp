import React, { Component } from 'react';
import { Container, Form, Item, Label, Input, Button, Text, Spinner, Toast, Root, Content, Thumbnail, Icon } from 'native-base';
import { ImageBackground, View, StatusBar, AsyncStorage } from 'react-native';
import * as firebase from "firebase";
import './ConnectFirebase';
// symbol polyfills
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');
// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            pass: '',            
            showToast: false
        }        
    }
    SignUp(email, pass) {
        try {
            firebase.auth()
                .createUserWithEmailAndPassword(email.trim(), pass)
                .then(() =>
                {
                    // save UserName && Email For User 
                    const name_user_singup = this.state.username;
                    const email_user_singup = this.state.email;  
                    // Frist Remove All Data From Mobile. 
                    AsyncStorage.multiRemove(['name_user_singup','email_user']);                   
                    AsyncStorage.multiSet([                        
                        ["name_user_singup", name_user_singup],
                        ["email_user", email_user_singup]
                    ]).then(() => {                        
                        Toast.show({
                            text: "Done registration",
                            duration: 3000,
                            type: "success"
                        });
                        setTimeout(()=>{
                            this.props.navigation.navigate('Login');
                        },2000)
                    });                    
                }                                    
                ).catch((error) => { alert(error.toString()) });
        } catch (error) {
            console.log(error.toString())
        }
    }    
    static navigationOptions = {        
        headerTransparent: true,
        headerStyle: { borderBottomWidth: 0 },
        headerTintColor: '#16a085'
        
    };     
    render() {
        return (
            <Root>
                <StatusBar backgroundColor="#16a085" barStyle="light-content" />
                <ImageBackground
                    source={require('./../../src/backgroundsignup.jpg')}
                    style={{ resizeMode: 'cover', flex: 1 }}
                >
                    <Container style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: "rgba(242, 242, 242, 0.84)" }}>
                        <Content style={{ padding: 20 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
                                <Thumbnail
                                    square large
                                    style={{ resizeMode: 'contain', width: 150, height: 130 }}
                                    source={require('./../../src/hospital-icon.png')}
                                />
                            </View>
                            <Form style={{ width: '100%', color: "#333" }}>
                                <Item floatingLabel>
                                    <Label>userName</Label>
                                    <Input onChangeText={(user) => {
                                        this.setState({ username: user });
                                    }} />
                                </Item>
                                <Item floatingLabel>
                                    <Label>Email</Label>
                                    <Input onChangeText={(email) => {
                                        this.setState({ email: email });
                                    }} />
                                </Item>
                                <Item floatingLabel>
                                    <Label>Password</Label>
                                    <Input onChangeText={(Password) => {
                                        this.setState({ pass: Password });
                                    }} />
                                </Item>
                                <Button
                                    light full rounded
                                    onPress={() => this.SignUp(this.state.email, this.state.pass)}
                                    style={{ marginTop: 45, backgroundColor: '#16a085', marginHorizontal: "15%"}}
                                >
                                    <Icon name='add-user' type='Entypo' style={{color: '#fff'}}/>                                
                                </Button>
                            </Form>
                        </Content>
                    </Container>
                </ImageBackground>
            </Root>
        );
    }
}
export default SignUp;