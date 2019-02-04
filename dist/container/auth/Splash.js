import React, { Component } from 'react';
import {View, Text, AsyncStorage} from 'react-native';

class Splash extends Component {
	static navigationOptions = {
	    header: null,   
	};	
	componentDidMount(){

		AsyncStorage.getItem('app_token').then((token)=>{
			if(token){				
				this.props.navigation.navigate('Home');
			}else{
				this.props.navigation.navigate('Login');
			}
		})
	}
  	render() {
    	return (
	      <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center', backgroundColor:"#16a085"}}> 
	            <Text> Splash Page </Text>
	        </View>
    	);
  	}
}

export default Splash;
