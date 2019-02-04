import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from '../container/auth/Login';
import SignUp from '../container/auth/SignUp';
import TabNavigator from './TabNavigator';
import Filter from './../container/Filter';
import Splash from './../container/auth/Splash';

const RootStack = createStackNavigator({    
  Login:{
    screen: Login
  },
  SignUp:{
    screen: SignUp
  },
  Filter:{
    screen: Filter
  },
  Home: {
    screen: TabNavigator,
    navigationOptions: {
      header: null
    }
  },
  Splash :{screen: Splash}
},
{
  initialRouteName: "Login"
}
);
export default createAppContainer(RootStack);