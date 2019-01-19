import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from '../container/auth/Login';
import SignUp from '../container/auth/SignUp';
import TabNavigator from './TabNavigator';
import Filter from './../container/Filter';

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
  }
},
{
  initialRouteName: "Login"
}
);
export default createAppContainer(RootStack);