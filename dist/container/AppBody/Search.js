import React, { Component } from 'react';
import { Container, Content, Icon, Form, Item, Input, Button, Text } from "native-base";
import { View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

class Search extends Component {
    static navigationOptions = {        
        headerTransparent: true,
        headerStyle: { borderBottomWidth: 0 },
        headerTintColor: 'rgba(242, 242, 242, 0.84)'        
    }; 
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            autoComplete: 'none'           
        };
        this.submitForm = this.submitForm.bind(this);
        this.InputSearch = this.InputSearch.bind(this);
    }
    
    InputSearch(text) {
        if(text == ''){
            this.setState({autoComplete: 'none'})    
        }else{
            this.setState({ autoComplete: 'flex' })
        }
        

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
                                defaultValue={this.state.search}                              
                                style={{
                                    fontSize:14,paddingRight: 35
                                }}
                                />
                            <Icon active name='search-location' type="FontAwesome5" style={{ 
                                fontSize: 20, position: "absolute", right: 0, color: "#16a085"
                            }} />                            
                        </Item>
                        <ScrollView style={{ 
                            backgroundColor: '#ddd', display: this.state.autoComplete,
                            width: '100%', height: 160}}>
                            <Button
                                hasText transparent
                                onPress={() => this.setState({autoComplete: 'none', search: 'Name Hospital'})}
                                style={{ marginTop: 5 }}
                            >
                                <Text style={{ color: "#333", fontSize: 13, textAlign: 'center' }}>
                                    Name Hospital                                                                         
                                </Text>
                            </Button>
                            <Button
                                hasText transparent
                                onPress={() => this.setState({autoComplete: 'none'})}
                                style={{ marginTop: 5 }}
                            >
                                <Text style={{ color: "#333", fontSize: 13, textAlign: 'center' }}>
                                    Name Hospital                                                                         
                                </Text>
                            </Button>
                            <Button
                                hasText transparent
                                onPress={() => this.setState({autoComplete: 'none'})}
                                style={{ marginTop: 5 }}
                            >
                                <Text style={{ color: "#333", fontSize: 13, textAlign: 'center' }}>
                                    Name Hospital                                                                         
                                </Text>
                            </Button>
                            <Button
                                hasText transparent
                                onPress={() => this.setState({autoComplete: 'none'})}
                                style={{ marginTop: 5 }}
                            >
                                <Text style={{ color: "#333", fontSize: 13, textAlign: 'center' }}>
                                    Name Hospital                                                                         
                                </Text>
                            </Button>                         
                            <Button
                                hasText transparent
                                onPress={() => this.setState({autoComplete: 'none'})}
                                style={{ marginTop: 5 }}
                            >
                                <Text style={{ color: "#333", fontSize: 13, textAlign: 'center' }}>
                                    Name Hospital                                                                         
                                </Text>
                            </Button>
                            <Button
                                hasText transparent
                                onPress={() => this.setState({autoComplete: 'none'})}
                                style={{ marginTop: 5 }}
                            >
                                <Text style={{ color: "#333", fontSize: 13, textAlign: 'center' }}>
                                    Name Hospital                                                                         
                                </Text>
                            </Button>
                            <Button
                                hasText transparent
                                onPress={() => this.setState({autoComplete: 'none'})}
                                style={{ marginTop: 5 }}
                            >
                                <Text style={{ color: "#333", fontSize: 13, textAlign: 'center' }}>
                                    Name Hospital                                                                         
                                </Text>
                            </Button>
                        </ScrollView>                   
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
