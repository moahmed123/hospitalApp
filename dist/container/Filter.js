import React, { Component } from 'react';
import { Container, Content, Icon, Picker, Form, Item, Input, Button, Text } from "native-base";

class Filter extends Component {
   static navigationOptions = {
      header: null
   };
    constructor(props) {
        super(props);
        this.state = {
          selected: "key2",
          selected2: ""
        };
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
    render() {
        return (
            <Container style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center', backgroundColor:"#16a085"}}>
               <Content style={{textAlign: 'right', direction:"rtl", backgroundColor:"#fff", marginHorizontal: "5%", borderRadius: 5, padding: 20}}>
                  <Form>
                     <Item>                        
                        <Input placeholder='بحث بأسم المستشفى'/>
                        <Icon active name='search-location' type="FontAwesome5" style={{fontSize:20}}/>
                     </Item>

                     <Text style={{paddingHorizontal: 25, paddingTop: 20, color: "#333", textDecorationLine:'underline'}}> أقسام المستشفى : </Text>
                     <Picker
                        mode="dropdown"
                        iosIcon={<Icon name = "arrow-down-drop-circle"/>}
                        headerStyle={{ backgroundColor: "#aaa" }}
                        headerBackButtonTextStyle={{ color: "#fff", textAlign: 'left', direction:"rtl"}}
                        headerTitleStyle={{ color: "#cc0000" }}                        
                        selectedValue={this.state.selected}
                        onValueChange={this.onValueChange.bind(this)}
                     >                     
                        <Picker.Item label="جميع الفئات" value="all" />
                        <Picker.Item label="قسم امراض النساء والولادة" value="قسم امراض النساء والولادة" />
                        <Picker.Item label="قسم الجراحة العامة" value="قسم الجراحة العامة" />
                        <Picker.Item label="قسم العيون" value="قسم العيون" />
                        <Picker.Item label="قسم الكلى" value="قسم الكلى" />
                        <Picker.Item label="قسم الاطفال" value="قسم الاطفال" />
                        <Picker.Item label="قسم العظام" value="قسم العظام" />
                        <Picker.Item label="قسم أمراض القلب" value="قسم أمراض القلب" />
                        <Picker.Item label="قسم جراحات المخ والأعصاب" value="قسم جراحات المخ والأعصاب" />
                        <Picker.Item label="قسم الأورام" value="قسم الأورام" />
                        <Picker.Item label="قسم جراحات التجميل" value="قسم جراحات التجميل" />                        
                     </Picker>              

                     <Text style={{paddingHorizontal: 25, paddingTop: 20, color: "#333", textDecorationLine:'underline'}}> البحث ﻷقرب موقع : </Text>
                     <Picker
                        mode="dropdown"
                        iosIcon={<Icon name = "arrow-down"/>}
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
                    
                     <Button rounded block style={{marginHorizontal: '35%', marginTop:40}}>
                        <Text style={{fontSize: 18}}>بحث</Text>
                     </Button>
                  </Form>             
               </Content>
          </Container>
        );
    }
}
export default Filter;
