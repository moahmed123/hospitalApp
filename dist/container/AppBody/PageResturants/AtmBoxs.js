import React, { Component } from 'react';
import { Card, CardItem, Button, Body, Text, Icon, View, Spinner } from 'native-base';
import { connect } from 'react-redux';
import * as actionCreatores from './../../../actions';

class AtmBoxs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            distanceLoading: false
        };
    }
    _RatingFun() {
        let rating = [],
            ratingRes = Math.round(this.props.DataAtm['rating']);
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
            rating = Math.round(this.props.DataAtm['rating']),
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
                            {this.props.DataAtm['name']}
                        </Text>
                        <Text>
                            {this._RatingFun()}
                            {this._StarUnrating()}
                            {
                                (!this.props.DataAtm['user_ratings_total']) ? null :
                                    <Text style={{ color: '#a4b0be', fontSize: 13 }}>
                                        &nbsp;&nbsp;review ({this.props.DataAtm['user_ratings_total']})
                                </Text>
                            }
                        </Text>
                        {
                            (!this.props.DataAtm['vicinity']) ? null :
                                <Text style={{ paddingTop: 18, paddingBottom: 10 }}>
                                    <Icon name='location' type='Entypo' style={{ color: '#34495e', fontSize: 18 }} />
                                    &nbsp;&nbsp;{this.props.DataAtm['vicinity']}
                                </Text>
                        }
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {
                                (!this.props.DataAtm['types'][0]) ? null :
                                    <Text style={{
                                        backgroundColor: "#3498db", color: "#fff",
                                        paddingVertical: 5, paddingHorizontal: 10,
                                        borderRadius: 5, marginRight: 5, marginTop: 5, fontSize: 12
                                    }}>
                                        {this.props.DataAtm['types'][0]}
                                    </Text>
                            }
                            {
                                (!this.props.DataAtm['types'][1]) ? null :
                                    <Text style={{
                                        backgroundColor: "#16a085", color: "#fff",
                                        paddingVertical: 5, paddingHorizontal: 10,
                                        borderRadius: 5, marginRight: 5, marginTop: 5, fontSize: 12
                                    }}>
                                        {this.props.DataAtm['types'][1]}
                                    </Text>
                            }
                        </View>
                        <Button style={{
                            marginTop: 15, width: '100%', backgroundColor: "#fafafa",
                            borderRadius: 4
                        }} full light
                            onPress={
                                () => {
                                    this.setState({ distanceLoading: true });
                                    // this.props.Navigation.navigate('MapDistance');
                                    const DataForAtm = [{
                                        name: this.props.DataAtm['name'],
                                        address: this.props.DataAtm['vicinity'],
                                        review: this.props.DataAtm['user_ratings_total'],
                                        rating: this.props.DataAtm['rating'],
                                        longitude: this.props.DataAtm['geometry']['location']['lng'],
                                        latitude: this.props.DataAtm['geometry']['location']['lat'],
                                    }]
                                    this.props.DataHospitalAction(DataForAtm);
                                    setTimeout(() => {
                                        this.setState({ distanceLoading: false });
                                        this.props.Navigation.navigate('MapDistance');
                                    }, 2000)
                                }}>

                            <Text style={{
                                textAlign: 'center', width: '100%', color: "#3498db", fontSize: 13
                            }}>
                                View Distance (Map)
                            </Text>
                            {(this.state.distanceLoading == false) ? null :
                                <Spinner color="#3498db" size={20} style={{ right: 20, position: 'absolute' }} />
                            }
                        </Button>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}
function mapStateToProps(state) {
    return {
        DetailsDataAtm: state.Atm
    }
}
export default connect(mapStateToProps, actionCreatores)(AtmBoxs);
