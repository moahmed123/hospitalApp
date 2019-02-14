import React, { Component } from 'react';
import { BackHandler, PermissionsAndroid, View ,Text} from 'react-native';
import { connect } from 'react-redux';
import * as actionCreatores from '../../actions';
import { Container, Spinner, Content, Button} from 'native-base';
import AppHeader from "../AppHeader";
import List from "./List";

class Result extends Component {
    static navigationOptions = {
        header: null
    };
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        { this.props.NumberOpenedPage() }    
        {this._requestLocationPermission()}         
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
        return this.props.AllData["hospital"].map((data, i)=>{
            return(
                <List key = {i} AllData = {data}/>            
            );
        })
    }
    _requestLocationPermission(){            
        try {
            const granted = PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'Cool Photo App ACCESS_FINE_LOCATION Permission',
                message:
                  'Cool Photo App needs access to your ACCESS_FINE_LOCATION ' +
                  'so you can take awesome pictures.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              alert('You can use the ACCESS_FINE_LOCATION');

            } else {
                alert('ACCESS_FINE_LOCATION permission denied');
            }
          } catch (err) {
            console.warn(err);
          }                
    }
    render() {        
        return (
            <Container>
                <AppHeader Navigation={this.props.navigation} />
                <Content style={{ textAlign: 'right', direction: "rtl"}}>
                    {this._ShowAllData()}
                    <Button style={{width: "100%"}} onPress={()=> this._requestLocationPermission()}>
                        <Text style={{color: "#fff"}}>Location</Text>
                    </Button>                    
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