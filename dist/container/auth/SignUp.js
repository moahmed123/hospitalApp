import React, { Component } from 'react';
import { Container, Form, Item, Label, Input, Button, Text, Toast, Root, Content, Thumbnail, Icon } from 'native-base';
import { ImageBackground, View, StatusBar } from 'react-native';
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
                ).catch((error) => { alert(error.toString()) });
        } catch (error) {
            console.log(error.toString())
        }
    }
    static navigationOptions = {        
        headerTransparent: true,
        headerStyle: { borderBottomWidth: 0 }
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
                                    <Label>Email</Label>
                                    <Input onChangeText={(user) => {
                                        this.setState({ user: user });
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
                                    onPress={() => this.SignUp(this.state.user, this.state.pass)}
                                    style={{ marginTop: 45, backgroundColor: '#16a085', marginHorizontal: "15%"}}
                                >
                                    <Icon name='add-user' type='Entypo' style={{color: '#fff'}}/>
                                    {/* <Text style={{ color: "#fff" }}>SignUp</Text> */}
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