import React, { Component } from 'react';
import { Container, Content, Icon, Text, Spinner} from 'native-base';
import {Dimensions, View} from 'react-native';
import { connect } from 'react-redux';
import * as actionCreatores from '../../actions';
import AppHeader from '../AppHeader';
import { AdMobInterstitial, AdMobBanner } from 'react-native-admob-dfp';
// Use Map View
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

class ViewDistance extends Component {
    constructor(props) {
        super(props);      
        this.state = {
          lat: "",
          long: ""
        };
    }
    componentDidMount() {
        this.watchId = navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                });
            },
            (error) => { alert(error.message) }
        );
        // Ads For Cover Page 
        AdMobInterstitial.setAdUnitID('ca-app-pub-7316325922246137/3351601937');
        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    }
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }
    _RatingFun() {
        let rating = [],
            ratingRes = Math.round(this.props.DetailsDataHospital[0]['rating']);
        for (let i = 0; i < ratingRes; i++) {
            rating.push(
                <Text key={i}>
                    <Icon name='star' type='FontAwesome' style={{
                        color: "#f39c12", fontSize: 12
                    }} />
                </Text>
            )
        }
        return rating;
    }
    _StarUnrating() {
        let starunrating = [],
            rating = Math.round(this.props.DetailsDataHospital[0]['rating']),
            unrating = 5 - rating;
        if (rating < 5) {
            for (let i = 0; i < unrating; i++) {
                starunrating.push(
                    <Text key={i}>
                        <Icon name='star' type='FontAwesome' style={{
                            color: "#bdc3c7", fontSize: 12
                        }} />
                    </Text>
                )
            }
        }
        return starunrating;

    }
    render() {
        const {height} = Dimensions.get('window'),
        GOOGLE_MAPS_APIKEY = 'AIzaSyA1_LlH4b_MSwz_vYyVm4Sxf2fAgRO8U-U';        

        if(this.state.lat != '' && this.state.long != '' && this.props.DetailsDataHospital != null){            
            const origin = {latitude: this.state.lat, longitude: this.state.long},
            destination = {
                latitude: this.props.DetailsDataHospital[0]["latitude"],
                longitude: this.props.DetailsDataHospital[0]["longitude"]            
            };
            return (
                <Container>
                    <AppHeader Navigation={this.props.navigation} />
                    <Content style={{flex: 9}}>
                        <MapView                            
                            showsUserLocation                        
                            followsUserLocation                              
                            zoomEnabled = {true}                                                        
                            initialRegion={{
                                latitude: this.state.lat,
                                longitude: this.state.long,     
                                latitudeDelta: 0.0024250270688370961,
                                longitudeDelta: 0.0013358723958820065,
                            }}
                            style={{ width: "100%", height:height/2.5}}
                        >
                            <MapViewDirections
                                origin={origin}
                                destination={destination}
                                apikey={GOOGLE_MAPS_APIKEY}
                                strokeWidth={5}
                                strokeColor="#3498db"
                            />
                             <MapView.Marker                             
                                coordinate = {{
                                    latitude: this.props.DetailsDataHospital[0]["latitude"],
                                    longitude: this.props.DetailsDataHospital[0]["longitude"]
                                }}
                                title = {this.props.DetailsDataHospital[0]["name"]}
                                description = {this.props.DetailsDataHospital[0]['vicinity']}                    
                            >          
                                <Icon type="FontAwesome5" name="map-marker-alt" style={{
                                    color:"#9b59b6",fontSize: 30
                                }}/>
                            </MapView.Marker>
                        </MapView>
    
                        {/* Start Box For Data  */}
                        <View style={{margin: 20}}>
                            <Text style={{ fontWeight: "600", color: "#3498db", fontSize: 18 }}>                            
                                {this.props.DetailsDataHospital[0]["name"]}
                            </Text>
                            <Text>
                                {this._RatingFun()}
                                {this._StarUnrating()}
                                {
                                    (!this.props.DetailsDataHospital[0]['review']) ? null :
                                        <Text style={{ color: '#a4b0be', fontSize: 13 }}>
                                            &nbsp;&nbsp;review ({this.props.DetailsDataHospital[0]['review']})
                                    </Text>
                                }
                            </Text>
                            {
                                (!this.props.DetailsDataHospital[0]['address'])? null:
                                <Text style={{ paddingTop: 18, paddingBottom: 10 }}>
                                    <Icon name='location' type='Entypo' style={{ color: '#34495e', fontSize: 18 }} />
                                    &nbsp;&nbsp;{this.props.DetailsDataHospital[0]['address']}
                                </Text>
                            }
                        </View>
                        {/* End Box For Data  */}
                    </Content>        
                    <View style={{
                        alignItems: 'center', paddingBottom: 10,
                        justifyContent: 'flex-end', backgroundColor: '#fff'}}>
                        <AdMobBanner
                            adSize="banner"
                            adUnitID="ca-app-pub-7316325922246137/7852161715"
                            testDevices={[AdMobBanner.simulatorId]}
                        />
                    </View>            
                </Container>
            );
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
function mapStateToProps(state) {
    return {
        DetailsDataHospital: state.DetailsHospital
    }
}
export default connect(mapStateToProps, actionCreatores)(ViewDistance);