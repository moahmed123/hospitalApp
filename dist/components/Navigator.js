import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from '../container/auth/Login';
import SignUp from '../container/auth/SignUp';
import TabNavigator from './TabNavigator';
import Filter from './../container/Filter';
import Splash from './../container/auth/Splash';
import Search from './../container/AppBody/Search';
import HomeBox from './../container/AppBody/HomeBox';
import Resturants from './Resturants';
import ViewDistance from './../container/AppBody/ViewDistance';

const RootStack = createStackNavigator({

   Login:{screen: Login},

   SignUp:{screen: SignUp},

   Filter:{screen: Filter},

   Search:{screen: Search},

   Splash :{screen: Splash},

   MapDistance :{
      screen: ViewDistance,
      navigationOptions:{
         header: null
      }
   },

   HomeBox: {
     screen : HomeBox,
     navigationOptions: {
        header: null
     }
   },

   Resturants: {
      screen: Resturants,
      navigationOptions: {
         header: null
      }
   },

   Home: {
      screen: TabNavigator,
      navigationOptions: {
         header: null
      }
   }
},
{
   initialRouteName: "Splash"
});

export default createAppContainer(RootStack);
