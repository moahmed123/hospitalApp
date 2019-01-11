import { createStackNavigator, createAppContainer } from "react-navigation";
import Main from './Main';
import Login from './Login';

const RootStack = createStackNavigator({
  Home: {
    screen: Main
  },
  Login:{
    screen: Login
  }  
},
{
  initialRouteName: "Login"
}
);

const Navigator = createAppContainer(RootStack);

export default Navigator;