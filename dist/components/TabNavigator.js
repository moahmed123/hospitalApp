import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import {Icon} from 'native-base';
import List from './../container/AppBody/List';
import Destination from './../container/AppBody/Destination';

const Tab = createBottomTabNavigator(
    {
        List: {
            screen : List
        },
        Destination : {
            screen: Destination
        }
    },
    {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;        
        let iconName;
        let iconType;
        if (routeName === 'List') {
            iconName = "list";
            iconType = "Entypo";

        } else if (routeName === 'Destination') {
            iconName = "map-marked-alt";
            iconType = "FontAwesome5";
        }
        // You can return any component that you like here!
        return <Icon name={iconName} style={{fontSize: 18, color: tintColor }} type= {iconType} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#cc0000',
      inactiveTintColor: 'gray',
    }
  }
);
export default createAppContainer(Tab);