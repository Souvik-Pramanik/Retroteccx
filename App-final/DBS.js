import React, { useState, Component } from 'react';
import Animated from 'react-native-reanimated';

import HomeScreen from './src/Components/HomeScreen/HomeScreen';
import ReportScreen from './src/Components/ReportScreen/ReportScreen';
import AboutScreen from './src/Components/AboutScreen/AboutScreen';
import LoginScreen from './src/Components/LoginScreen/LoginScreen';
import MyReportScreen from './src/Components/MyReportScreen/MyReportScreen';


import CustomDrawerContent from './src/Components/Drawer/CustomDrawerContent';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import LinearGradient from 'react-native-linear-gradient';
import { Icon, Button } from 'native-base';

const SideBar = createDrawerNavigator();
const HomeStack = createStackNavigator();
const ReportStack = createStackNavigator();
const AboutStack = createStackNavigator();
const LoginStack = createStackNavigator();
const MyReportStack= createStackNavigator();
const Stack = createStackNavigator();

const Screen = ({ navigation, style }) => (
    <Animated.View style={[{flex: 1}, style]}>
        <Stack.Navigator screenOptions={ {
            headerStyle: {
                backgroundColor: "#1480E7",
            },
        } } headerMode={ 'screen' }>
            <Stack.Screen name='Home' component={ HomeScreen } options={ {
                title: 'Home',
                headerLeft: () => (
                    <Button transparent onPress={ () => { navigation.openDrawer() } }>
                        <Icon name='menu' style={ { color: '#F2E8E5' } } />
                    </Button>
                ),
                headerTitleStyle: {
                    color: "#F1F3F6"
                },

            } } />
            <Stack.Screen name='Report' component={ ReportScreen } options={ {
                title: 'Report',
                headerLeft: () => (
                    <Button transparent onPress={ () => { navigation.openDrawer() } }>
                        <Icon name='menu' style={ { color: '#F2E8E5' } } />
                    </Button>
                ),
                headerTitleStyle: {
                    color: "#F1F3F6"
                },

            } } />
            <Stack.Screen name='AboutUs' component={ AboutScreen } options={ {
                title: 'About Us',
                headerLeft: () => (
                    <Button transparent onPress={ () => { navigation.openDrawer() } }>
                        <Icon name='menu' style={ { color: '#F2E8E5' } } />
                    </Button>
                ),
                headerTitleStyle: {
                    color: "#F1F3F6"
                },

            } } />
            <Stack.Screen name='MyReport' component={ MyReportScreen } options={ {
                title: 'My Reports',
                headerBackAllowFontScaling: true,
                headerStyle: { backgroundColor: 'rgba(147,12,178,1)'},
                headerLeft: () => (
                    <Button transparent onPress={ () => { navigation.openDrawer() } }>
                        <Icon name='menu' style={ { color: '#F2E8E5' } } />
                    </Button>
                ),
                headerTitleStyle: {
                    color: "#F1F3F6"
                },

            } } />
            <Stack.Screen name='Login' component={ LoginScreen } options={ { headerShown: false } } />
        </Stack.Navigator>
    </Animated.View>
    
);


// const HomeStackScreen = ({ navigation }) => (
//     <HomeStack.Navigator screenOptions={ {
//         headerStyle: {
//             backgroundColor: "#1480E7",
//         }
//     } }>
//         <HomeStack.Screen name='Home' component={ HomeScreen } options={ {
//             title: 'Home',
//             headerLeft: () => (
//                 <Button transparent onPress={ () => {navigation.openDrawer()} }>
//                     <Icon name='menu' style={ { color: '#F2E8E5' } } />
//                 </Button>
//             ),
//             headerTitleStyle: {
//                 color: "#F1F3F6"
//             },
            
//         } } />
        
        
//     </HomeStack.Navigator>
// );

// const ReportStackScreen = ({ navigation }) => (
//     <ReportStack.Navigator screenOptions={ {
//         headerStyle: {
//             backgroundColor: "#1480E7"
//         }
//     } }>
//         <ReportStack.Screen name='Report' component={ ReportScreen } options={ {
//             title: 'Report',
//             headerLeft: () => (
//                 <Button transparent onPress={ () => navigation.openDrawer() }>
//                     <Icon name='menu' style={ { color: '#F2E8E5' } } />
//                 </Button>
//             ),
//             headerTitleStyle: {
//                 color: "#F1F3F6"
//             },
//             ...TransitionPresets.RevealFromBottomAndroid
//         } } />
//     </ReportStack.Navigator>
// );

// const AboutStackScreen = ({ navigation }) => (
//     <AboutStack.Navigator screenOptions={ {
//         headerStyle: {
//             backgroundColor: "#1480E7"
//         }
//     } }>
//         <AboutStack.Screen name='About us' component={ AboutScreen } options={ {
//             title: 'About us',
//             headerLeft: () => (
//                 <Button transparent onPress={ () => navigation.openDrawer() }>
//                     <Icon name='menu' style={ { color: '#F2E8E5' } } />
//                 </Button>
//             ),
//             headerTitleStyle: {
//                 color: "#F1F3F6"
//             }
//         } } />
//     </AboutStack.Navigator>
// );

// const LoginStackScreen = () => (
//     <LoginStack.Navigator headerMode={ 'none' }>
//         <LoginStack.Screen name='Login' component={ LoginScreen } />
//     </LoginStack.Navigator>
// );

// const MyReportStackScreen = ({navigation})=>(
//     <MyReportStack.Navigator screenOptions={ {
//         headerStyle: {
//             backgroundColor: "#1480E7"
//         }
//     } }>
//         <MyReportStack.Screen name='MyReport' component={ MyReportScreen } options={ {
//             title: 'My Reports',
//             headerLeft: () => (
//                 <Button transparent onPress={ () => navigation.openDrawer() }>
//                     <Icon name='menu' style={ { color: '#F2E8E5' } } />
//                 </Button>
//             ),
//             headerTitleStyle: {
//                 color: "#F1F3F6"
//             }
//         } } />
//     </MyReportStack.Navigator>
// )

const DBS =()=>{
    const [progress, setProgress] = useState(new Animated.Value(0))
    
    const scale = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [1, 0.8],
        useNativeDriver: true
    })
    const screenStyle = {transform: [{scale}]};
    return (
        <LinearGradient
            colors={ ['#FF9933', '#FFFFFF', '#138808'] }
            style={{ flex: 1 }}>
        <NavigationContainer>
            <SideBar.Navigator
                drawerType='slide'
                overlayColor='transparent'
                drawerStyle={{backgroundColor: 'transparent'}}
                sceneContainerStyle={{backgroundColor: 'transparent'}}
                // lazy={false}
                backBehavior={'initialRoute'}
                initialRouteName="Screen"
                drawerContent={
                    (props) =>{
                        setProgress(props.progress)
                        return <CustomDrawerContent { ...props }/>
                    }
                }>
                <SideBar.Screen name="Screen">
                    {props=><Screen {...props} style={screenStyle} />}
                </SideBar.Screen>
                {/* <SideBar.Screen name="Home" component={ HomeStackScreen } />
                <SideBar.Screen name="Report" component={ ReportStackScreen } options={ {unmountOnBlur : true}}/>
                <SideBar.Screen name="About us" component={ AboutStackScreen } />
                <SideBar.Screen name="Login" component={ LoginStackScreen } options={ { unmountOnBlur: true } } />
                <SideBar.Screen name="MyReport" component={ MyReportStackScreen } /> */}
            </SideBar.Navigator>
        </NavigationContainer>
        </LinearGradient>
    );
};

export default DBS;
