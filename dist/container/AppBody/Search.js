import React, { Component } from 'react';
import { Container, Content, Icon, Form, Item, Input, Button, Text } from "native-base";
import * as actionCreatores from '../../actions';
import { connect } from 'react-redux';
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
            autoComplete: false           
        };
        this.submitForm = this.submitForm.bind(this);
        this.InputSearch = this.InputSearch.bind(this);
    }
    
    // Fun AutoComplete: 
    autoComplete(){
        if (!this.props.AllData){
            return null;
        }        
        return this.props.AllData['hospital'].map((data,i) => {
            return(
                <Button
                    hasText transparent
                    onPress={() => this.setState({autoComplete: false, search: data['name']})}
                    style={{ marginTop: 5 }}
               key={i} >
                    <Text style={{ color: "#333", fontSize: 13, textAlign: 'center' }}>
                        {data['name']}
                    </Text>
                </Button>
            )
        })
    }
    InputSearch(text) {
        if(text == ''){
            this.setState({autoComplete: false})    
        }else{
            this.setState({ autoComplete: true })
        }
        

    }
    // Function Submit For Search 
    submitForm() {        
        this.props.GeoLocation('all', '20000', 20, 0, this.state.search, "all");
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
                       {(this.state.autoComplete)?
                            <ScrollView style={{
                                backgroundColor: '#fafafa',width: '100%', 
                                height: 160, borderWidth:1, 
                                borderColor: "#ddd", borderStyle: 'solid'
                            }}>
                                {this.autoComplete()}
                            </ScrollView>  
                       : null}                                         
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
function mapStateToProps(state){
    return{
        AllData: state.Result
    }
}
export default connect(mapStateToProps, actionCreatores) (Search);