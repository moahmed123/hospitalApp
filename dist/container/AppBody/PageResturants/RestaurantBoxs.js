import React, { Component } from 'react';
import { Card, CardItem, Body, Text, Icon ,View, Button,Spinner} from 'native-base';
import { connect } from 'react-redux';
import * as actionCreatores from './../../../actions';

class RestaurantBoxs extends Component {
    constructor(props) {
        super(props);      
        this.state = {
         distanceLoading: false         
        };
    }
    _RatingFun() {
        let rating = [],
            ratingRes = Math.round(this.props.DataRestautant['rating']);
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
            rating = Math.round(this.props.DataRestautant['rating']),
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
        return (
            <Card>
                <CardItem>
                    <Body>
                        <Text style={{ fontWeight: "600", color: "#3498db", fontSize: 18 }}>
                            {this.props.DataRestautant['name']}
                        </Text>
                        <Text>
                            {this._RatingFun()}
                            {this._StarUnrating()}
                            {
                                (!this.props.DataRestautant['user_ratings_total'])? null :
                                <Text style={{ color: '#a4b0be', fontSize: 13 }}>
                                    &nbsp;&nbsp;review ({this.props.DataRestautant['user_ratings_total']})
                                </Text>
                            }
                            
                        </Text>
                        {
                            (!this.props.DataRestautant['vicinity'])?null:
                            <Text style={{paddingTop: 18, paddingBottom: 10}}>
                                <Icon name='location' type='Entypo' style={{ color: '#34495e', fontSize: 18 }} />
                                &nbsp;&nbsp;{this.props.DataRestautant['vicinity']}
                            </Text>
                        }
                        
                        <View style={{ textAlign: 'right', direction: "rtl", width: "100%",flexDirection:'row', flexWrap:'wrap'}}>
                            {
                                (!this.props.DataRestautant['types'][0])?null:
                                <Text style={{                            
                                    backgroundColor: "#3498db", color: "#fff",
                                    paddingVertical: 5, paddingHorizontal:10,
                                    borderRadius: 5, marginRight: 5, marginTop: 5,fontSize: 12
                                    }}>
                                    {this.props.DataRestautant['types'][0]}
                                </Text>
                            }
                            {
                                (!this.props.DataRestautant['types'][1])?null:
                                <Text style={{                            
                                    backgroundColor: "#16a085", color: "#fff",
                                    paddingVertical: 5, paddingHorizontal:10,
                                    borderRadius: 5, marginRight: 5, marginTop: 5,fontSize: 12
                                    }}>
                                    {this.props.DataRestautant['types'][1]}
                                </Text>
                            }
                            
                            {
                                (!this.props.DataRestautant['types'][2])?null:
                                <Text style={{                            
                                    backgroundColor:"#9b59b6", color: "#fff",
                                    paddingVertical: 5, paddingHorizontal:10, width: null,
                                    borderRadius: 5, marginTop: 5, fontSize: 12
                                    }}>
                                    {this.props.DataRestautant['types'][2]}
                                </Text>
                            }
                            
                            {
                                (!this.props.DataRestautant['types'][3])?null:
                                <Text style={{                            
                                    backgroundColor:"#34495e", color: "#fff",
                                    paddingVertical: 5, paddingHorizontal:10, width: null,
                                    borderRadius: 5, marginTop: 5, fontSize: 12
                                    }}>
                                    {this.props.DataRestautant['types'][3]}
                                </Text>
                            }
                            
                            {
                                (!this.props.DataRestautant['types'][4])?null:
                                <Text style={{                            
                                    backgroundColor:"#9b59b6", color: "#fff",
                                    paddingVertical: 5, paddingHorizontal:10, width: null,
                                    borderRadius: 5, marginTop: 5, fontSize: 12
                                    }}>
                                    {this.props.DataRestautant['types'][4]}
                                </Text>
                            }
                            
 
                        </View>
                        <Button style={{ 
                            marginTop: 15, width: '100%', backgroundColor: "#fafafa",
                            borderRadius: 4
                        }} full light
                        onPress={
                            () => {
                                this.setState({distanceLoading: true});                                
                                const DataForRestautant = [{
                                    name     : this.props.DataRestautant['name'],
                                    address  : this.props.DataRestautant['vicinity'],
                                    review   : this.props.DataRestautant['user_ratings_total'],
                                    rating   : this.props.DataRestautant['rating'],
                                    longitude: this.props.DataRestautant['geometry']['location']['lng'],
                                    latitude : this.props.DataRestautant['geometry']['location']['lat'],
                                }]                                        
                                this.props.DataHospitalAction(DataForRestautant);
                                setTimeout(()=>{
                                    this.setState({distanceLoading: false}); // To Hidden Loading 
                                    this.props.Navigation.navigate('MapDistance'); // Redirect To Page MapDistance
                                },2000)
                            }
                        }> 
                            <Text style={{
                                textAlign: 'center', width: '100%', color: "#3498db", fontSize: 13
                            }}>                            
                                View Distance (Map)
                            </Text>                            
                            {(this.state.distanceLoading == false)? null : 
                                <Spinner color="#3498db" size= {20} style={{right: 20, position: 'absolute'}}/> 
                            }
                        </Button>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}
function mapStateToProps(state){
    return{
        DetailsDataHospital: state.DetailsHospital
    }
}
export default connect(mapStateToProps, actionCreatores)(RestaurantBoxs);
