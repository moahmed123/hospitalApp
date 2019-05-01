import React, { Component } from 'react';
import { Container, Form, View, Item, Input, Button, Text, Icon, Thumbnail, Content, Spinner } from 'native-base';
import { AsyncStorage, ImageBackground, StatusBar } from 'react-native';
import * as firebase from "firebase";
import {AdMobBanner} from 'react-native-admob-dfp'
import './ConnectFirebase';
// symbol polyfills
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');
// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: '',
            showToast: false,
            loading:  false
        }
        this.Login = this.Login.bind(this);
        this.loadingButton = this.loadingButton.bind(this);
    }
    componentDidMount(){
        AsyncStorage.multiGet(['email_user']).then((data) => {
            let email = data[0][1];
            console.log(email);
            if (email !== null){
                this.setState({
                    user: email
                });
            }
        });
    }
    Login(email, pass) {
        try {
            firebase.auth()
                .signInWithEmailAndPassword(email.trim(), pass)
                .then((user) => {
                    // Loading Button
                    this.setState({
                        loading: true
                    })
                    // Save Token && Email
                    const token = user['user']['refreshToken'];
                    const email = user['user']['email'];
                    AsyncStorage.multiSet([
                        ["app_Token", token],
                        ["email_user", email]
                    ]).then(() => {
                        this.props.navigation.navigate('HomeBox');
                    });
                })
                .catch((error) => { alert(error.toString()) });
        } catch (error) {
            console.log(error.toString())
        }
    }
    // Function Loading When Login
    loadingButton(){
        if ( this.state.loading == false){
            return <Icon name='login' type='MaterialCommunityIcons' style={{ color: "#fff", fontSize: 25 }} />
        }else{
            return <Spinner color='#fafafa' style={{ fontSize: 25, opacity: .6 }}  />
        }

    }
    static navigationOptions = {
        header: null,
    };
    render() {
        return (
            <ImageBackground
                source={require('./../../src/backgroundLogin.jpg')}
                style={{ resizeMode: 'cover', flex: 1 }}
            >
             <StatusBar backgroundColor="#16a085" barStyle="light-content" />
             {/* , */}
                <Container style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: "rgba(242, 242, 242, 0.84)" }}>
                    <Content style={{ padding: 20,}}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
                            <Thumbnail
                                square large
                                style={{ resizeMode: 'contain', width: 150, height: 130 }}
                                source={require('./../../src/hospital-icon.png')}
                            />
                        </View>
                        <Form style={{ width: '100%', color: "#333" }}>                            
                                <Input onChangeText={(user) => {
                                    this.setState({ user: user });
                                }}
                                onSubmitEditing = {()=>{this.PasswordInputRef._root.focus()}}
                                value={this.state.user} 
                                placeholder = 'Email'
                                placeholderTextColor='#999'
                                style={{
                                    borderColor: 'transparent',
                                    borderBottomColor:"#ddd", 
                                    marginBottom: 20,
                                    borderStyle: 'solid',
                                    borderWidth: 1                                
                                }}/>
                                <Input
                                    ref = {input => {this.PasswordInputRef = input}}                                    
                                    secureTextEntry
                                    onChangeText={(Password) => {
                                        this.setState({ pass: Password });
                                    }} 
                                    placeholder='Password'
                                    placeholderTextColor='#999'
                                    onSubmitEditing = {() => this.Login(this.state.user, this.state.pass)}
                                    style={{
                                        borderColor: 'transparent',
                                        borderBottomColor:"#ddd",                                         
                                        borderStyle: 'solid',
                                        borderWidth: 1                                
                                    }}/>                          
                            <Button
                                light info full rounded
                                onPress={() => this.Login(this.state.user, this.state.pass)}
                                style={{ marginTop: 45, backgroundColor: '#16a085', marginHorizontal: "15%" }}
                            >                               
                               {this.loadingButton()}
                            </Button>
                        </Form>
                        <View style={{marginHorizontal: '10%', marginTop: 15}}>
                            <Button
                                hasText transparent
                                onPress={() => this.props.navigation.navigate('SignUp')}
                                style={{ marginTop: 5 }}
                            >
                                <Text style={{ color: "#aaa", fontSize: 13, textAlign: 'center' }}>
                                    Don't have an account?
                                    <Text style={{ color: "#16a085", fontSize: 13 }}> SIGNUP </Text>
                                </Text>
                            </Button>
                            <View style={{alignItems: 'center',  flex: 1}}>
                                <AdMobBanner
                                    adSize="banner"
                                    adUnitID="ca-app-pub-7316325922246137/7295911915"
                                    testDevices={[AdMobBanner.simulatorId]}
                                />
                            </View>
                        </View>                        
                    </Content>
                </Container>
            </ImageBackground>
        );
    }
}
export default Login;
