import React, { Component } from 'react';
import {View, Text, AsyncStorage} from 'react-native';

class Splash extends Component {
	constructor(props){
        super(props);
        this._delayLoading = this._delayLoading.bind(this);
    }
	static navigationOptions = {
	    header: null,   
	};	
	componentDidMount(){		
		AsyncStorage.multiGet(['app_Token']).then((data) => {
			const Token = data[0][1];
			console.log(Token);
			if(Token){								
				this._delayLoading('Home');				
			}else{				
				this._delayLoading('Login');				
			}
        });
	}
	_delayLoading(screen){
		setTimeout(() => {
			this.props.navigation.navigate(screen);
		}, 1000);
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
