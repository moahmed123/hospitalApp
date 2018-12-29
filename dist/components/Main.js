import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreatores from './../actions';
import { View, Text } from 'react-native';

class Main extends Component{  
    componentDidMount(){
        {this.props.NumberOpenedPage()}
    }
    render() {                
        if ( !this.props.AllData ){
            return <Text>Mohamed Alaa Abase </Text>;
        }
        return (
          <View>
              <Text> Welcome to Mohamed Alaa ! </Text>
              <Text> El Hamde Ella To Learning </Text>
              <Text> {this.props.AllData['adminCount']} </Text>
          </View>
        );
      }
}

function mapStateToProps( state ){
    return{
        AllData : state.Result 
    }
}

export default connect ( mapStateToProps, actionCreatores )( Main );