import React, { Component } from 'react';
import { BackHandler, PermissionsAndroid, View, Dimensions , RefreshControl,Text} from 'react-native';
import { connect } from 'react-redux';
import * as actionCreatores from '../../actions';
import { Container, Spinner, Content, Icon} from 'native-base';
import AppHeader from "../AppHeader";
import List from "./List";
const {height} = Dimensions.get('window');    

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
          refreshing: false,
        };
        this._onRefresh = this._onRefresh.bind(this);
    }    
    static navigationOptions = {
        header: null
    };
    // Use When Refresh Data.
    _onRefresh(){        
        this.setState({refreshing: true});
        this.props.NumberOpenedPage().then(() => {
          this.setState({refreshing: false});
          
        });
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        // { this.props.GetHospitalData(name,city,cat,limit,minlimit,lng,lat,dis,active) }    
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
                <View style = {{flex: 1,height: height-135}}>
                    <Spinner color="#16a085" style={{paddingTop: (height-135)/2, textAlign: "center"}}/> 
                </View>                    
            );
        }else{
            console.log(this.props.AllData['count']); 
            const CountData =  this.props.AllData['count'];
            if(CountData <= 0 ){
                return (                    
                    <View style = {{flex: 1,height: height-135}}>
                        <Icon type='FontAwesome5' name='hospital-alt' style={{
                            paddingTop: (height-200)/2, textAlign: "center",
                            fontSize: 45, color: '#16a085'
                        }}/>
                        <Text style = {{textAlign: "center", color: '#2c3e50', fontSize: 16, paddingTop:15}}>                        
                            No 
                            <Text style={{fontWeight: '600', color:'#16a085', fontSize: 18}} > Hospitals </Text> 
                            Found In This Area
                        </Text>                                                                            
                    </View>                    
                );  
            }else{
                return this.props.AllData["hospital"].map((data, i)=>{
                    return(
                        <List key = {i} AllData = {data}/>            
                    );
                });
            }
        }
        
    }
    _requestLocationPermission(){                                           
        return new Promise(async() => {
            const permissions = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (permissions === PermissionsAndroid.RESULTS.GRANTED){
                // Alert.alert('access true');
                navigator.geolocation.getCurrentPosition(
                    (position) => {                      
                      const latitude  = position.coords.latitude,
                            longitude = position.coords.longitude,
                            limit     = 20,
                            minlimit  = 0,
                            dis       = 2000,
                            name      = 'all',
                            city      = 'all',
                            cat       = 'all';
                      this.props.GetHospitalData(name,city,cat,limit,minlimit,longitude,latitude,dis,true);                      
                    },
                    (error) => {alert(error.message)}                    
                ); 
            }
            else{
                BackHandler.exitApp();
            }
        });
    }
    render() {            
        return (
            <Container>
                <AppHeader Navigation={this.props.navigation} />
                <Content style={{ textAlign: 'right', direction: "rtl"}}
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