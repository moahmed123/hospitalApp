import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from '../container/auth/Login';
import SignUp from '../container/auth/SignUp';
import TabNavigator from './TabNavigator';
import Filter from './../container/Filter';
import Splash from './../container/auth/Splash';

const RootStack = createStackNavigator({

   Login:{screen: Login},

   SignUp:{screen: SignUp},

   Filter:{screen: Filter},

   Splash :{screen: Splash},

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