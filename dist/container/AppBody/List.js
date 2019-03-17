import React, { Component } from 'react';
import { Icon, Card, CardItem, View, Body, Text } from 'native-base';

class List extends Component {

  render() {
    return (
        <Card>
            <CardItem>
                <Body style={{ textAlign: 'right', direction: "rtl", width: "100%",flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={{
                        textAlign: 'right', direction: "rtl", width: "100%",
                        fontWeight: "600", color: "#3498db",fontSize: 18
                        }}>
                        {this.props.AllData['name']}
                    </Text>
                    <View style={{ display: 'flex' }}>
                        <Text style={{
                            width: null, lineHeight: 25,
                            textAlign: 'right', direction: "rtl",
                            marginBottom: 10, paddingTop: 10, color: '#34495e',
                        }}>
                            &nbsp;&nbsp;    {this.props.AllData['details']}
                        </Text>
                        <View style={{position: 'absolute', right: 0, top: 12}}>
                            <Icon name='location' type='Entypo' style={{color: '#34495e', fontSize: 20}}/>
                        </View>
                    </View>
                    {/* Three Box Color Background Data */}
                    <Text style={{
                        textAlign: 'right', direction: "rtl",
                        backgroundColor: "#3498db", color: "#fff",
                        paddingVertical: 5, paddingHorizontal:10,
                        borderRadius: 5, marginRight: 5, marginTop: 5,fontSize: 14
                        }}>
                        {this.props.AllData['categories']}
                    </Text>
                    <Text style={{
                        textAlign: 'right', direction: "rtl",
                        backgroundColor:"#34495e", color: "#fff",
                        paddingVertical: 5, paddingHorizontal:10,
                        borderRadius: 5,marginRight: 5, marginTop: 5
                        }}>
                        <Icon type="FontAwesome" name="phone" style={{color: '#fff',fontSize: 15}}/>
                        <Text style={{color: '#fff', fontSize: 14}}> {this.props.AllData['phone']}</Text>
                    </Text>
                    <Text style={{
                        textAlign: 'right', direction: "rtl",
                        backgroundColor:"#9b59b6", color: "#fff",
                        paddingVertical: 5, paddingHorizontal:10, width: null,
                        borderRadius: 5, marginTop: 5, fontSize: 14
                        }}>
                        {this.props.AllData['city']}
                    </Text>
                    {/* Three Box Color Background Data */}
                </Body>
            </CardItem>
        </Card>
    );
  }
}
export default List;
