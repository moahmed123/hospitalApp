import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreatores from './../../actions'
import { Container, Content, Text, Icon, Spinner } from 'native-base';
import {Dimensions, View} from 'react-native';
import MapView from 'react-native-maps';
import AppHeader from "./../AppHeader";

class Destination extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);      
        this.state = {
          lat: "",
          long: ""
        };
    }
    componentDidMount() {
        //this.watchId =  
        navigator.geolocation.watchPosition(
            (position) => {
              this.setState({
                lat: position.coords.latitude,
                long: position.coords.longitude                
              });              
            },
            (error) => {alert(error.message)},
            //{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        ); 
    }
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }
    // Marker Map To View All Hospital 
    _MarkerHospitalData(){
        return this.props.result['hospital'].map((dataHospital,i) => {
            return(
                <MapView.Marker 
                    key = {i}                        
                    coordinate = {{
                        latitude: dataHospital['loc']['coordinates'][1],
                        longitude: dataHospital['loc']['coordinates'][0]
                    }}
                    title = {dataHospital['name']}
                    description = {dataHospital['details']}                    
                >          
                    <Icon type="MaterialCommunityIcons" name="hospital-marker" style={{
                        color:"#9b59b6",fontSize: 50
                    }}/>
                </MapView.Marker>
               
            )
        });
    }

    render() {
        const {height} = Dimensions.get('window');
        if(this.state.lat != '' && this.state.long != ''){
            return (
                <Container>
                    <AppHeader Navigation={this.props.navigation} />
                    <Content>                    
                        <MapView
                            // showsPointsOfInterest                            
                            showsUserLocation                        
                            followsUserLocation
                            // showsMyLocationButton                        
                            initialRegion={{
                                latitude: this.state.lat,//37.78825,
                                longitude: this.state.long,//-122.4324,
                                // latitudeDelta: 0.005,
                                // longitudeDelta: 0.005
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,                            
                            }}
                            style={{ width: "100%", height:height - 125}}
                        >
                            {this._MarkerHospitalData()}
                        </MapView>
                    </Content>
                </Container>
            )
        }else{
            return (
                <View style={{flex: 1,justifyContent: 'center', alignItem: 'center'}}>
                    <Spinner color="#16a085"/> 
                    <Text style={{textAlign: 'center', fontSize:14, color:"#bdc3c7"}}> Loading Map ... </Text>
                </View>
                
            )
        }        
    }
}
function mapStateToProps(state){
    return{
        result: state.Result   
    }
}
export default connect (mapStateToProps, actionCreatores)(Destination);