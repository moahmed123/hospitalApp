import React, { Component } from 'react';
import { View, Text, Dimensions, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import * as actionCreatores from '../../../actions';
import { Container, Spinner, Content, Icon, Fab} from 'native-base';
// Pages Boxs 
import AppHeader from "../../AppHeader";
import HospitalBoxs from './HospitalBoxs';
import RestaurantBoxs from './RestaurantBoxs';
import {AdMobBanner} from 'react-native-admob-dfp'

const {height} = Dimensions.get('window');
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,            
            location: "",
            raduis: "",
            type: "",
            key: "",
            hospital: false, // useless
            Restaurants: false // useless
        }
        this._nameOfPage = this._nameOfPage.bind(this);        
        this._onRefresh = this._onRefresh.bind(this);
    }
    componentDidMount() {
        // To Git Location For Refresh Page 
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const location = position.coords.latitude + "," + position.coords.longitude;                        
                    this.setState({
                        location: location,                                                        
                    });                      
            },
            (error) => {alert(error.message)}
        );
    }
    _nameOfPage() {
        if (!this.props.Page) {
            return null;

        } else {
            return <Text style={{ color: this.state.colorText }}> {this.props.Page} </Text>
        }
    }
    _loadingComp(){
        return(
            <View style = {{flex: 1,height: height-135}}>
                    <Spinner color="#16a085" style={{paddingTop: (height-135)/2, textAlign: "center"}}/>
            </View>
        )
    }
    _ShowDataForGoogle() {
        if (!this.props.Page) {
            return null;

        }else if (this.props.Page == 1) {   // Page Hospital Google 
            if (!this.props.googleHospital) {
                return (
                    <View>
                        {this._loadingComp()}
                    </View>
                );
                
            } else if (this.props.googleHospital && this.props.googleHospital['status'] == 'ZERO_RESULTS' ){
                return (
                    <View style = {{flex: 1,height: height-133}}>
                        <Icon type='FontAwesome5' name='hospital-alt' style={{
                            paddingTop: (height-200)/2, textAlign: "center",
                            fontSize: 45, color: '#16a085'
                        }}/>
                        <Text style = {{textAlign: "center", color: '#2c3e50', fontSize: 16, paddingTop:15}}>
                            No
                            <Text style={{fontWeight: '600', color:'#16a085', fontSize: 18}} > Hospitals </Text>
                            Found In This Area
                        </Text>
                        <View style={{justifyContent: 'flex-end', flex:1 }}>
                            <AdMobBanner
                                adSize="fullBanner"
                                adUnitID="ca-app-pub-7316325922246137/9456673457"
                                testDevices={[AdMobBanner.simulatorId]}
                            />
                        </View>
                    </View>
                );
            }else {
                return this.props.googleHospital['results'].map( (data, i) => {
                    return <HospitalBoxs key = {i} DataHospital = {data}/> 
                });               
            }
         
        }else if (this.props.Page == 2) {   // Page Restautant Google 
            if (!this.props.googleRestautant) {
                return (
                    <View>
                        {this._loadingComp()}
                    </View>
                );
                
            } else if (this.props.googleRestautant && this.props.googleRestautant['status'] == 'ZERO_RESULTS' ){
                return (
                    <View style = {{flex: 1,height: height-133}}>
                        <Icon type='MaterialCommunityIcons' name='food' style={{
                            paddingTop: (height-200)/2, textAlign: "center",
                            fontSize: 45, color: '#16a085'
                        }}/>
                        <Text style = {{textAlign: "center", color: '#2c3e50', fontSize: 16, paddingTop:15}}>
                            No
                            <Text style={{fontWeight: '600', color:'#16a085', fontSize: 18}} > Restaurants </Text>
                            Found In This Area
                        </Text>
                        <View style={{justifyContent: 'flex-end', flex:1 }}>
                            <AdMobBanner
                                adSize="fullBanner"
                                adUnitID="ca-app-pub-7316325922246137/9456673457"
                                testDevices={[AdMobBanner.simulatorId]}
                            />
                        </View>
                    </View>
                );

            } else {
                //RestaurantBoxs
                return this.props.googleRestautant['results'].map( (data, i) => {
                    return <RestaurantBoxs key = {i} DataRestautant = {data}/> 
                });                               
            }
        }        
    }
     // Use When Refresh Data.
     _onRefresh(){
        this.setState({refreshing: true});
        if(this.props.Page == 1){
            // Page Hospital
            const radius = 1400,
                type   = "hospital",
                key    = "AIzaSyA1_LlH4b_MSwz_vYyVm4Sxf2fAgRO8U-U";                                  
            this.props.GetResturantsGoogle(this.state.location, radius, type, key).then(() => {
                this.setState({refreshing: false});      
            });
        }else if(this.props.Page == 2){            
            // Page restaurant
            const radius = 5000,
            type   = "restaurant",
            key    = "AIzaSyA1_LlH4b_MSwz_vYyVm4Sxf2fAgRO8U-U";

            this.props.GetResturantsGoogle(this.state.location, radius, type, key).then(() => {
                this.setState({refreshing: false});      
            });
        }
       
    }
    render() {
        return (
            <Container>
                <AppHeader Navigation={this.props.navigation} />
                <Content
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                            title="Pull to refresh"
                            tintColor="#9b59b6"
                            titleColor="#34495e"
                            colors={["#16a085", "#9b59b6",  "#34495e"]}
                            />
                    }
                >
                    {
                        (!this.props.googleHospital && !this.props.googleRestautant )? null :
                        <View style={{paddingTop: 3, alignItems: "center"}}>                            
                            <AdMobBanner
                                adSize="banner"
                                adUnitID="ca-app-pub-7316325922246137/9456673457"
                                testDevices={[AdMobBanner.simulatorId]}
                            />
                        </View>
                    }                    
                    <View>                
                        {this._ShowDataForGoogle()}
                    </View>
                    {
                        (!this.props.googleHospital && !this.props.googleRestautant )? null :
                        <View style={{paddingTop: 10, alignItems: "center"}}>                            
                            <AdMobBanner
                                adSize="banner"
                                adUnitID="ca-app-pub-7316325922246137/9456673457"
                                testDevices={[AdMobBanner.simulatorId]}
                            />
                        </View>
                    }
                </Content>
            </Container>
        );
    }
};
function mapStateToProps(state) {
    return {
       Page             : state.PageName, // To Know Page 
       googleRestautant : state.Restautant, // Data For Restautant
       googleHospital   : state.Hospital // Data Hospital 
    }
}
export default connect(mapStateToProps, actionCreatores)(List);
