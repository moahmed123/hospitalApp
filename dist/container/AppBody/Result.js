import React, { Component } from 'react';
import { BackHandler, PermissionsAndroid, Alert , RefreshControl,Text} from 'react-native';
import { connect } from 'react-redux';
import * as actionCreatores from '../../actions';
import { Container, Spinner, Content, Button} from 'native-base';
import AppHeader from "../AppHeader";
import List from "./List";

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
        // try{            
        //     const permissions = PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        //     if (permissions === PermissionsAndroid.RESULTS.GRANTED) resolve(true);
        //     else reject(false);
        //     // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //     //     console.log('You can use the Location');
        //     // } else {
        //     //     console.log('Location permission denied');
        //     // }
        // }catch(err) {            
        //     console.warn(err);
        // }                        
        return new Promise(async() => {
            const permissions = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (permissions === PermissionsAndroid.RESULTS.GRANTED){
                Alert.alert('access true');
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