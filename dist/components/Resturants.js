import React from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Icon } from 'native-base';
//Pages
import Home from '../container/AppBody/PageResturants/List';
import Destination from './../container/AppBody/Destination';
import Profile from './../container/AppBody/Profile';

const Resturants = createBottomTabNavigator(
  {
    Home: Home,
    Destination: Destination,
    Profile: Profile,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        let iconType;
        if (routeName === 'Home') {
            iconName = "list";
            iconType = "Entypo";

        } else if (routeName === 'Destination') {
            iconName = "map-marked-alt";
            iconType = "FontAwesome5";

        } else if (routeName === 'Profile') {
            iconName = "user-tie";
            iconType = "FontAwesome5";
        }
        // You can return any component that you like here!
        return <Icon name={iconName} style={{fontSize: 18, color: tintColor }} type= {iconType} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);
export default createAppContainer(Resturants)
