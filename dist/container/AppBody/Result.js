import React, { Component } from 'react';
import { BackHandler, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actionCreatores from '../../actions';
import { Container, Spinner, Card, CardItem, Content, Body, Text } from 'native-base';
import AppHeader from "../AppHeader";
import List from "./List";

class Result extends Component {
    static navigationOptions = {
        header: null
    };
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        { this.props.NumberOpenedPage() }           
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    handleBackPress = () => {
        //BackHandler.exitApp(); // To Exit App.         
    }
    onClickFun() {
        this.props.navigation.navigate('filter');
        console.log('ada')
    }
    // Loop For Data 
    _ShowAllData(){
        if (!this.props.AllData) {
            return (
                <Container>
                    <Content>
                        <Spinner />
                    </Content>
                </Container>
            );
        }
        return this.props.AllData["hotels"].map((data, i)=>{
            return(
                <List key = {i} AllData = {data}/>            
            );
        })
    }
    render() {        
        return (
            <Container>
                <AppHeader Navigation={this.props.navigation} />
                <Content style={{ textAlign: 'right', direction: "rtl"}}>
                    {this._ShowAllData()}                    
                </Content>
            </Container>
        );
    }
}
function mapStateToProps(state) {
    return {
        AllData: state.Result
    }
}
export default connect(mapStateToProps, actionCreatores)(Result);