import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreatores from './../../actions'
import { Container, Content, Text, Icon, Spinner } from 'native-base';
import {Dimensions, View} from 'react-native';
import MapView from 'react-native-maps';
import AppHeader from "./../AppHeader";
import {AdMobInterstitial} from 'react-native-admob-dfp';

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
        this.watchId =  navigator.geolocation.watchPosition(
            (position) => {
              this.setState({
                lat: position.coords.latitude,
                long: position.coords.longitude                
              });              
            },
            (error) => {alert(error.message)}
        ); 
          // Ads For Cover Page 
        AdMobInterstitial.setAdUnitID('ca-app-pub-7316325922246137/8941958083');
        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    }
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }
    // Marker Map To View All Hospital 
    _MarkerHospitalData(){
        // Check Page 
        if (this.props.Page == 1){
            // Page Google Hospital 
            if(!this.props.googleHospital){
                return null;
            }else{                
                return this.props.googleHospital['results'].map((dataHosMar, i) => {
                    return (
                        <MapView.Marker 
                            key = {i}                        
                            coordinate = {{
                                latitude: dataHosMar['geometry']['location']['lat'],
                                longitude: dataHosMar['geometry']['location']['lng']
                            }}
                            title = {dataHosMar['name']}
                            description = {dataHosMar['vicinity']}                    
                        >          
                            <Icon type="MaterialCommunityIcons" name="hospital-marker" style={{
                                color:"#9b59b6",fontSize: 50
                            }}/>
                        </MapView.Marker>
                    );
                });
            }            
        } else if(this.props.Page == 2){
            // Page Google Restaurant 
            if(!this.props.googleRestautant){
                return null;
            }else{
                return this.props.googleRestautant['results'].map( (dataResMar, i)=>{
                    return(
                        <MapView.Marker 
                            key = {i}                        
                            coordinate = {{
                                latitude: dataResMar['geometry']['location']['lat'],
                                longitude: dataResMar['geometry']['location']['lng']
                            }}
                            title = {dataResMar['name']}
                            description = {dataResMar['vicinity']}                    
                        >          
                            <Icon type="FontAwesome5" name="map-marker-alt" style={{
                                color:"#9b59b6",fontSize: 30
                            }}/>
                        </MapView.Marker>
                    )
                })
            }
        } else if(this.props.Page == 3){
            // Page Google Restaurant 
            if(!this.props.googleAtm){
                return null;
            }else{
                return this.props.googleAtm['results'].map( (dataResMar, i)=>{
                    return(
                        <MapView.Marker 
                            key = {i}                        
                            coordinate = {{
                                latitude: dataResMar['geometry']['location']['lat'],
                                longitude: dataResMar['geometry']['location']['lng']
                            }}
                            title = {dataResMar['name']}
                            description = {dataResMar['vicinity']}                    
                        >          
                            <Icon type="FontAwesome5" name="map-marker-alt" style={{
                                color:"#9b59b6",fontSize: 30
                            }}/>
                        </MapView.Marker>
                    )
                })
            }
        }
        else{
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
                                latitudeDelta: 0.0122,
                                longitudeDelta: 0.0121,                            
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
        result           : state.Result, // Result Of Hospital APIS Custom 
        Page             : state.PageName, // To Know Page 
        googleRestautant : state.Restautant, // Data For Restautant
        googleHospital   : state.Hospital, // Data Hospital 
        googleAtm        : state.Atm // Data ATM
    }
}
export default connect (mapStateToProps, actionCreatores)(Destination);