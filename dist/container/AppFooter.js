import React, { Component } from 'react';
import {Footer, FooterTab, Button, Icon } from 'native-base';

class AppFooter extends Component {    
    render() {
        return (      
            <Footer>
                <FooterTab>
                    <Button active>
                        <Icon active name="apps" />
                    </Button>
                    <Button onPress={()=> this.props.Navigation.navigate('Destination')} {...this.props.activeMap}>
                        <Icon name="map-marked-alt" type ="FontAwesome5" {...this.props.activeMap}/>
                    </Button>                
                    <Button>
                        <Icon name="person" />
                    </Button>
                </FooterTab>
            </Footer>      
        );
    }
}
export default AppFooter;