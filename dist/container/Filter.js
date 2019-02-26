import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreatores from '../actions/index';
import { Container, Content, Icon, Picker, Form,  Button, Text } from "native-base";

class Filter extends Component {    
    static navigationOptions = {        
        headerTransparent: true,
        headerStyle: { borderBottomWidth: 0 },
        headerTintColor: 'rgba(242, 242, 242, 0.84)'        
    }; 
    constructor(props) {
        super(props);
        this.state = {            
            categories: "all",
            distance: "2000"            
        };
        this.submitForm = this.submitForm.bind(this);   
        this.GitLocation = this.GitLocation.bind(this);   
    }
    // Value For Categories 
    onCateChange(value) {
        this.setState({
            categories: value
        });
    }
    // Value For Distance 
    onDisChange(value) {
        this.setState({
            distance: value
        });
    }
    // Git Loation For User 
    GitLocation(categories, distance){        
        this.props.GeoLocation(categories, distance, 20, 0, "all", "all");
        this.props.navigation.navigate('Home');        
    }
    // Submit Buttom 
    submitForm() {        
        const categories = this.state.categories,
              distance   = this.state.distance;              
        // Run Function 
        this.GitLocation(categories, distance);                
    }    
    render() {     
        return (
            <Container style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: "#16a085" }}>
                <Content style={{ textAlign: 'right', direction: "rtl", backgroundColor: "#fff", marginHorizontal: "5%", borderRadius: 5, padding: 20 }}>
                    <Form>                      
                        <Text style={{
                            paddingHorizontal: 5, paddingTop: 30,
                            color: "#333",paddingBottom:10,borderStyle: 'solid',
                            borderBottomColor: "rgba(221, 221, 221, 0.36)", borderBottomWidth: 1
                        }}>
                            أقسام المستشفى :
                        </Text>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down-drop-circle" />}
                            headerStyle={{ backgroundColor: "#aaa" }}
                            headerBackButtonTextStyle={{ color: "#fff", textAlign: 'left', direction: "rtl" }}
                            headerTitleStyle={{ color: "#cc0000" }}
                            selectedValue={this.state.categories}
                            onValueChange= {this.onCateChange.bind(this)}
                        >
                            <Picker.Item label="جميع الفئات" value="all" />
                            <Picker.Item label="قسم امراض النساء والولادة" value="1" />
                            <Picker.Item label="قسم الجراحة العامة" value="2" />
                            <Picker.Item label="قسم العيون" value="3" />
                            <Picker.Item label="قسم الكلى" value="4" />
                            <Picker.Item label="قسم الاطفال" value="5" />
                            <Picker.Item label="قسم العظام" value="6" />
                            <Picker.Item label="قسم أمراض القلب" value="7" />
                            <Picker.Item label="قسم جراحات المخ والأعصاب" value="8" />
                            <Picker.Item label="قسم الأورام" value="9" />
                            <Picker.Item label="قسم جراحات التجميل" value="10" />
                        </Picker>

                        <Text style={{
                            paddingHorizontal: 5, paddingTop: 30,
                            color: "#333",paddingBottom:10,borderStyle: 'solid',
                            borderBottomColor: "rgba(221, 221, 221, 0.36)", borderBottomWidth: 1
                        }}>
                            البحث ﻷقرب موقع :                                              
                        </Text>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            headerStyle={{ backgroundColor: "#b95dd3" }}
                            headerBackButtonTextStyle={{ color: "#fff" }}
                            headerTitleStyle={{ color: "#fff" }}
                            selectedValue={this.state.distance}
                            onValueChange={this.onDisChange.bind(this)}
                        >
                            <Picker.Item label="2 كيلومتر" value="2000" />
                            <Picker.Item label="أقل من 5 كيلومتر" value="5000" />
                            <Picker.Item label="أقل من 10 كيلومتر" value="10000" />
                            <Picker.Item label=" 20 كيلومتر" value="20000" />
                        </Picker>

                        <Button rounded block
                            style={{ marginHorizontal: '35%', marginTop: 40, backgroundColor: '#9b59b6'}}
                            onPress={this.submitForm}
                        >
                            <Text style={{ fontSize: 18 }}>بحث</Text>
                        </Button>
                    </Form>
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
export default connect(mapStateToProps, actionCreatores)(Filter);
