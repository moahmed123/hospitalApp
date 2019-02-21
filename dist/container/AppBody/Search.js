// import React, { Component } from 'react';
// import { View,Text,Form,Item,Input,Icon, Button} from 'native-base';
// import { Dimensions } from 'react-native';

// const {height} = Dimensions.get('window');   

// export default class Search extends Component {   
//     constructor(props) {
//         super(props);    
//         this.SubmitFrom = this.SubmitFrom.bind(this);
//     }  
//     SubmitFrom(){        
//     }
//     render() {
//         return (
//             <View style={{
//                 backgroundColor: '#333', position: 'absolute',marginTop: height /2.9, 
//                 padding: 10 , marginHorizontal: "10%",
//                 height: this.props.hiddenSearch, opacity: this.props.hiddenSearch
//             }}>
//                 <Form>
//                     <Item regular rounded>
//                         <Input 
//                             type='text'
//                             placeholder='بحث بأسم المستشفى (اختياري)' 
//                             onChangeText={this.InputSearch} 
//                             placeholderTextColor = "#7f8c8d"                                
//                             style={{
//                                 fontSize:14,paddingRight: 35
//                             }}
//                             />                        
//                     </Item>
//                     <Button rounded block
//                             style={{ marginHorizontal: '35%', marginTop: 5 }}
//                             onPress={this.SubmitFrom}
//                         >
//                             <Text style={{ fontSize: 18 }}>بحث</Text>
//                     </Button>
//                 </Form>
//             </View>
//         );
//     }
// }
import React, { Component } from 'react';
import { Container, Content, Icon, Picker, Form, Item, Input, Button, Text } from "native-base";

class Search extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            search: "",            
        };
        this.submitForm = this.submitForm.bind(this);
        this.InputSearch = this.InputSearch.bind(this);
    }
    
    InputSearch(text) {
        this.setState({ search: text })
    }
    submitForm() {
        console.log(this.state.search);
        this.props.navigation.navigate('Home');
    }
    render() {
        return (
            <Container style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: "#16a085" }}>
                <Content style={{ textAlign: 'right', direction: "rtl", backgroundColor: "#fff", marginHorizontal: "5%", borderRadius: 5, padding: 20 }}>
                    <Form>
                        <Item regular rounded>
                            <Input 
                                type='text'
                                placeholder='بحث بأسم المستشفى' 
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
export default Search;
