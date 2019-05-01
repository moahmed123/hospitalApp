import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';
import {Header, Button, Icon, Body, Title, Right, Text } from 'native-base';
import { connect } from 'react-redux';
import * as actionCreatores from '../actions';

class AppHeader extends Component {
    constructor(props){
        super(props);     
        this.state = {
            emaillenght : ''
        }
    }
    componentDidMount(){
        // Get Email User. 
        AsyncStorage.multiGet(['email_user']).then((data) => {            
            let email = data[0][1];            
            if (email !== null){
                this.setState({
                    emaillenght: email.slice(0,2).toUpperCase()
                });
            }                
        });                                
    }
  render() {
    return (      
        <Header style={{backgroundColor:"#16a085"}} androidStatusBarColor="#16a085"> 
            <Body>
                <Title style={{
                    backgroundColor: "#fff",
                    borderRadius: 60/2, width: 40, height: 40, 
                     textAlign:"center", fontSize: 15, paddingTop: 9
                }}>
                    <Text style={{color: "#16a085"}}>
                        {this.state.emaillenght}
                    </Text>
                </Title>
            </Body>
            {
                (this.props.PageNamber== 1 || this.props.PageNamber == 2) ? null:
                <Right>
                    <Button transparent onPress={()=> this.props.Navigation.navigate('Filter')}>
                    <Icon name="dots-three-vertical" type="Entypo" />
                    </Button>
                </Right>
            }
            
        </Header>
    );
  }
}
function mapStateToProps(state){
    return{
        PageNamber: state.PageName
    }
}
export default connect(mapStateToProps, actionCreatores)(AppHeader);