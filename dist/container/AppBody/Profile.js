import React, { Component } from 'react';
import { Container, Content, Text, Button, Icon } from 'native-base';
import {AsyncStorage, View} from 'react-native';
import AppHeader from "../AppHeader";
import * as firebase from "firebase";
import './../auth/ConnectFirebase';
import {AdMobRewarded, AdMobBanner} from 'react-native-admob-dfp';
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
            emailUser : 'Your E_mail',
            name: ''
        }
    }
    static navigationOptions = {
        header: null
    };
    componentDidMount(){
        // Get Email User. 
        AsyncStorage.multiGet(['email_user',"name_user_singup"]).then((data) => {            
            let email = data[0][1];
            let userName = data[1][1];            
            if (email !== null){
                this.setState({
                    emailUser: email,
                    name: userName
                });
            }                
        });                        
        AdMobRewarded.setAdUnitID('ca-app-pub-7316325922246137/8685204184');
        AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd());
    }
    // Logout Function And Remove AsyncStorage
    _logOutUser() {        
        try {            
            firebase.auth().signOut().then(() => {
                AsyncStorage.multiRemove(['app_Token']).then(()=>{                    
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
                    <View style={{}}>
                        {
                        (!this.state.name)? null:
                        <Text style={{paddingVertical: 10, textAlign: 'center', marginTop:20, fontSize: 15}}>
                            <Text style={{fontWeight: "bold", fontSize: 15}}> Your Name : </Text>
                            { this.state.name }
                        </Text>
                        }                    
                        <Text style={{paddingVertical: 10, textAlign: 'center', marginTop:5, fontSize: 15}}>
                            <Text style={{fontWeight: "bold", fontSize: 15}}> Your Email : </Text>
                            { this.state.emailUser }
                        </Text> 
                        <Button 
                            success iconLeft rounded block 
                            style={{marginHorizontal: '25%', marginTop:15}}
                            onPress={this._logOutUser}
                            >
                            <Icon name='logout' type='AntDesign' />
                            <Text>Logout</Text> 
                        </Button>                                            
                    </View>                                        
                </Content>                
                <View style={{
                    alignItems: 'center',  flex: 1, paddingBottom: 10,
                    justifyContent: 'flex-end', backgroundColor: '#eee'}}>
                    <AdMobBanner
                        adSize="banner"
                        adUnitID="ca-app-pub-7316325922246137/2971322393"
                        testDevices={[AdMobBanner.simulatorId]}
                    />
                </View>
            </Container>
        );
    }
}
export default Profile;