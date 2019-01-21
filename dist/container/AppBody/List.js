import React, { Component } from 'react';
import {BackHandler,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import * as actionCreatores from './../../actions';
import { Container, Spinner, Card, CardItem, Content,Body, Text } from 'native-base';
import AppHeader from "./../AppHeader";

class List extends Component{  
    static navigationOptions = {
        header: null
    };
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        {this.props.NumberOpenedPage()}        
    }
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }  
    handleBackPress = () => {      
      //BackHandler.exitApp(); // To Exit App.         
    }
    onClickFun(){
      this.props.navigation.navigate('filter');
      console.log('ada')
    }
    render() {                
        if ( !this.props.AllData ){
            return (
              <Container>              
                <Content>
                  <Spinner />                
                </Content>
              </Container>
            );
        }
        return (
            <Container>
               <AppHeader Navigation = {this.props.navigation}/>
               <Content style={{textAlign: 'right', direction:"rtl"}}>
                  <Card>
                     <CardItem>
                        <Body style={{textAlign: 'right', direction:"rtl", width:"100%"}}>
                           <Text style={{textAlign: 'right', direction:"rtl", width:"100%", fontWeight: "600"}}>
                                 {this.props.AllData["hotels"][0]['name']} 
                           </Text>
                           <Text style={{textAlign: 'right', direction:"rtl", width:"100%"}}> 
                                 {this.props.AllData["hotels"][0]['details']} 
                           </Text>
                           <Text style={{textAlign: 'right', direction:"rtl", width:"100%"}}>
                              {this.props.AllData["hotels"][0]['categories']} 
                           </Text>
                           <Text style={{textAlign: 'right', direction:"rtl", width:"100%"}}>
                              +02 {this.props.AllData["hotels"][0]['phone']} 
                           </Text>
                           <Text style={{textAlign: 'right', direction:"rtl", width:"100%"}}>
                              {this.props.AllData["hotels"][0]['city']} 
                           </Text>
                        </Body>
                     </CardItem>
                  </Card>                                 
               </Content>                
            </Container>                        
        );
      }
}
function mapStateToProps( state ){
    return{
        AllData : state.Result 
    }
}
export default connect ( mapStateToProps, actionCreatores )( List );