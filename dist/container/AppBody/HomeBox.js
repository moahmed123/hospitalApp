import React, { Component } from 'react';
import { Container, Text, View, Content, Icon } from 'native-base';
import { TouchableHighlight, BackHandler, PermissionsAndroid, ImageBackground, Alert} from 'react-native';
import { connect } from 'react-redux';
import * as actionCreatores from '../../actions';

class HomeBox extends Component {
    constructor(props) {
        super(props);
        this.state = {            
            location: "",
            raduis: "",
            type: "",
            key: "",            
        }     
    }
    componentDidMount() {        
        {this._requestLocationPermission()}        
    }

    componentWillUnmount(){
        navigator.geolocation.clearWatch(this.watchID)
    }
    // Fun Access Location
    _requestLocationPermission(){
        return new Promise(async() => {
            const permissions = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (permissions === PermissionsAndroid.RESULTS.GRANTED){
                // getCurrentPosition
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const location = position.coords.latitude + "," + position.coords.longitude;                        
                            this.setState({
                                location: location,                                                        
                            });                      
                    },
                    (error) => {                                                
                        
                        if(error.code == 3){
                            Alert.alert(
                                'Please Change Location Mode To ',
                                ' GPS,Wi-fi and mobile networks or  Wi-fi and mobile networks and Reopen App' );                        
                        }else{
                            Alert.alert(error.message);
                        }
                        
                    },
                    {enableHighAccuracy: false, timeout: 2000, maximumAge: 3600000}
                );                
            }
            else{
                BackHandler.exitApp();
            }
        });
    }
    render() {
        return (
            <ImageBackground
                source={require('./../../src/restuarant.jpeg')}
                style={{ resizeMode: 'cover', flex: 1 }}
            >
                <Container style={{ flex: 1, justifyContent: 'center',
                     alignItems: 'center', flexDirection: 'row', 
                     backgroundColor: "rgba(242, 242, 242, 0.84)", justifyContent: 'space-between', }}>
                    <Content>
                        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, paddingBottom: 20 }}>
                            <Text class={{color: '#333', fontWeight: 'bold'}}> 
                                Choose <Text style={{color:'#9b59b6', fontWeight: 'bold'}}>Nearby</Text> Location   
                            </Text>
                        </View>                        

                        <View style={{ flex: 2, flexDirection: 'row' }}>
                            <View style={{ height: 150,display:"none"}}>
                                <TouchableHighlight onPress={() => {
                                    this.props.navigation.navigate('Home');
                                    this.props.CheckPage(null);// Page For Hospital Google
                                }}
                                    style={{ backgroundColor: 'powderblue', flex: 1 }}>
                                    <Text> Hospital </Text>
                                </TouchableHighlight>
                            </View>
                            <View style={{ height: 150, flex: 1, marginTop: 5, borderRadius: 5, marginHorizontal:10, marginRight: 5}}>                            
                                <ImageBackground
                                    source={require('./../../src/boxHospital.png')}
                                    style={{ resizeMode: 'cover', flex: 1 }}
                                >
                                    <TouchableHighlight onPress={() => {
                                        this.props.navigation.navigate('Resturants')
                                        this.props.CheckPage(1);// Page For Hospital Google
                                        const radius = 1400,
                                        type   = "hospital",
                                        key    = "AIzaSyA1_LlH4b_MSwz_vYyVm4Sxf2fAgRO8U-U";                                  
                                        this.props.GetResturantsGoogle(this.state.location, radius, type, key);
                                    }}
                                        style={{ backgroundColor: "rgba(0, 0, 0, 0.28)",
                                        justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                        <Text style={{ color: '#FFF', fontWeight: 'bold',fontSize: 25 }}>
                                             <Text style={{ color: '#2ecc71', fontWeight: 'bold',fontSize: 25 }}>
                                                Hos
                                            </Text>
                                            pital
                                        </Text>
                                    </TouchableHighlight>
                                </ImageBackground>
                                
                            </View>
                            {/* View ATM Bank Statment */}
                            <View style={{ height: 150,flex: 1,marginTop: 5, borderRadius: 5, marginHorizontal:5, marginLeft:0, marginRight:10}}>
                                <ImageBackground
                                    source={require('./../../src/ATM.jpg')}
                                    style={{ resizeMode: 'cover', flex: 1 }}
                                >
                                    <TouchableHighlight onPress={() => {
                                        this.props.navigation.navigate('Resturants')
                                        this.props.CheckPage(3);// Page For ATM Google (3)
                                        const radius = 5000,
                                        type   = "atm",
                                        key    = "AIzaSyA1_LlH4b_MSwz_vYyVm4Sxf2fAgRO8U-U";                                  
                                        this.props.GetResturantsGoogle(this.state.location, radius, type, key);                                                                                
                                    }}
                                    style={{ backgroundColor: "rgba(0, 0, 0, 0.28)",
                                    justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                        <Text style={{ color: '#FFF', fontWeight: 'bold',fontSize: 25 }}>
                                            A
                                            <Text style={{ color: 'rgb(92, 173, 255)', fontWeight: 'bold',fontSize: 25 }}>
                                            T
                                            </Text>
                                            M
                                        </Text>
                                    </TouchableHighlight>
                                </ImageBackground>
                            </View>
                        </View>
                        {/* View Restaurant */}
                        <View style={{ height: 150, borderRadius: 5,marginHorizontal:10, marginTop:5}}>
                            <ImageBackground
                                source={require('./../../src/boxRestuarant.png')}
                                style={{ resizeMode: 'cover', flex: 1 }}
                            >
                                <TouchableHighlight onPress={() => {
                                    this.props.navigation.navigate('Resturants');
                                    this.props.CheckPage(2);// Page For restaurant Google
                                    const radius = 5000,
                                        type   = "restaurant",
                                        key    = "AIzaSyA1_LlH4b_MSwz_vYyVm4Sxf2fAgRO8U-U";

                                    this.props.GetResturantsGoogle(this.state.location, radius, type, key);
                                }}
                                    style={{ flex: 1 ,backgroundColor: "rgba(0, 0, 0, 0.18)",
                                    justifyContent: 'center', alignItems: 'center' }}>
                                    
                                    <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 25 }}>
                                        <Text style={{ color: '#f39c12', fontWeight: 'bold', fontSize: 25 }}>Res</Text>taurant 
                                    </Text>
                                </TouchableHighlight>
                            </ImageBackground>                            
                        </View>
                    </Content>
                </Container>
            </ImageBackground>
        );
    }
}
function mapStateToProps(state) {
    return {
        PageChoose: state.PageName
    }
}
export default connect(mapStateToProps, actionCreatores)(HomeBox);
