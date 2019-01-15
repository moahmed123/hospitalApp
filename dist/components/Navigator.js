import { createStackNavigator, createAppContainer } from "react-navigation";
import List from './../container/AppBody/List';
import Destination from './../container/AppBody/Destination';
import Login from '../container/auth/Login';
import SignUp from '../container/auth/SignUp';

const RootStack = createStackNavigator({
  Home: {
    screen: List
  },
  Destination: {
    screen: Destination
  },  
  Login:{
    screen: Login
  },
  SignUp:{
    screen: SignUp
  }  
},
{
  initialRouteName: "Login"
}
);
const Navigator = createAppContainer(RootStack);

export default Navigator;
// import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
// export default createBottomTabNavigator(  
//   {  
//     'القران الكريم': { screen: DataQuran },
//     'أحاديث منتشرة': { screen: islamicAhades }    
//   },
//   {
//     navigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused, tintColor }) => {
//         const { routeName } = navigation.state;
//         let iconName;
//         if (routeName === 'القران الكريم') {
//           iconName = "book-open-page-variant";
//           return <MaterialCommunityIcons name={iconName} size={25} color={tintColor} />;

//         }else if (routeName === 'أحاديث منتشرة') {
//             iconName = 'message-text';
//             return <MaterialCommunityIcons name={iconName} size={25} color={tintColor} />;
//         }        
//         // You can return any component that you like here! We usually use an
//         // icon component from react-native-vector-icons        
//       },
//     }),
//     tabBarComponent: BottomTabBar,
//     tabBarPosition: 'bottom',
//     tabBarOptions: {
//       activeTintColor: '#765318',
//       inactiveTintColor: '#929292',
//     },
//     animationEnabled: false,
//     swipeEnabled: false,
//   }
// );
