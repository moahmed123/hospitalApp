import React, { Component } from 'react';
import { Container, Content, Text, Button, Icon } from 'native-base';
import {AsyncStorage, View} from 'react-native';
import AppHeader from "../AppHeader";
import * as firebase from "firebase";
import './../auth/ConnectFirebase';
// symbol polyfills
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');
// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

class Profile extends Component {
    constructor(props){
        super(props);
        this._logOutUser = this._logOutUser.bind(this);
        this.state = {
            emailUser : 'Your E_mail'
        }
    }
    static navigationOptions = {
        header: null
    };
    componentDidMount(){
        // Get Email User. 
        AsyncStorage.multiGet(['email_user']).then((data) => {            
            let email = data[0][1];            
            if (email !== null){
                this.setState({
                    emailUser: email
                });
            }                
        });                                
    }
    // Logout Function And Remove AsyncStorage
    _logOutUser() {        
        try {            
            firebase.auth().signOut().then(() => {
                AsyncStorage.removeItem('app_token').then(()=>{                    
                    this.props.navigation.navigate("Login");                    
                });                               
            });                                             
        }catch(error){
            console.log(error);
        }
    }
    render() {
        return (
            <Container>
                <AppHeader Navigation={this.props.navigation} />
                <Content style = {{flex:1, backgroundColor: '#eee'}}>                                   
                    <Text style={{paddingVertical: 20, textAlign: 'center', marginTop:5}}>
                        Your Email : { this.state.emailUser }
                    </Text> 
                    <Button 
                        success iconLeft rounded block 
                        style={{marginHorizontal: '25%', marginTop:15}}
                        onPress={this._logOutUser}
                        >
                        <Icon name='logout' type='AntDesign' />
                        <Text>Logout</Text> 
                    </Button>                    
                </Content>
            </Container>
        );
    }
}
export default Profile;