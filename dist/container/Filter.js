import React, { Component } from 'react';
import { Container, Content, Icon, Picker, Form, Item, Input, Button, Text } from "native-base";

class Filter extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            selected: "all",
            selected2: "5000"
        };
        this.submitForm = this.submitForm.bind(this);
        this.InputSearch = this.InputSearch.bind(this);
    }
    onValueChange(value) {
        this.setState({
            selected: value
        });
    }
    onValueChange2(value) {
        this.setState({
            selected2: value
        });
    }
    InputSearch(text) {
        this.setState({ search: text })
    }
    submitForm() {
        console.log(
            "cate :" + this.state.selected +
            "     " + " nearBy :" +
            this.state.selected2 +
            "     " + " nearBy :" + this.state.search);
    }
    render() {
        return (
            <Container style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: "#16a085" }}>
                <Content style={{ textAlign: 'right', direction: "rtl", backgroundColor: "#fff", marginHorizontal: "5%", borderRadius: 5, padding: 20 }}>
                    <Form>
                        <Item regular rounded>
                            <Input 
                                type='text'
                                placeholder='بحث بأسم المستشفى (اختياري)' 
                                onChangeText={this.InputSearch} 
                                placeholderTextColor = "#7f8c8d"                                
                                style={{
                                    fontSize:14,paddingRight: 35
                                }}
                                />
                            <Icon active name='search-location' type="FontAwesome5" style={{ 
                                fontSize: 20, position: "absolute", right: 0, color: "#16a085"
                            }} />
                        </Item>

                        <Text style={{
                            paddingHorizontal: 5, paddingTop: 30,
                            color: "#333",paddingBottom:10,borderStyle: 'solid',
                            borderBottomColor: "rgba(221, 221, 221, 0.36)", borderBottomWidth: 1
                        }}>
                            أقسام المستشفى :
                            &nbsp;
                            <Text style={{ 
                                color: "#7f8c8d", fontSize: 13, 
                                paddingHorizontal: 10, textDecorationLine: "none"                                
                                }}>
                                (اختياري)
                            </Text>
                        </Text>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down-drop-circle" />}
                            headerStyle={{ backgroundColor: "#aaa" }}
                            headerBackButtonTextStyle={{ color: "#fff", textAlign: 'left', direction: "rtl" }}
                            headerTitleStyle={{ color: "#cc0000" }}
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
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
                            &nbsp;
                            <Text style={{ color: "#7f8c8d", fontSize: 13, paddingVertical: 10}}>(اختياري)</Text>                        
                        </Text>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            headerStyle={{ backgroundColor: "#b95dd3" }}
                            headerBackButtonTextStyle={{ color: "#fff" }}
                            headerTitleStyle={{ color: "#fff" }}
                            selectedValue={this.state.selected2}
                            onValueChange={this.onValueChange2.bind(this)}
                        >
                            <Picker.Item label="أقل من 5 كيلومتر" value="5000" />
                            <Picker.Item label="أقل من 10 كيلومتر" value="10000" />
                            <Picker.Item label="" value="" />
                        </Picker>

                        <Button rounded block
                            style={{ marginHorizontal: '35%', marginTop: 40 }}
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
export default Filter;
