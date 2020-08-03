import React, { Component } from 'react';
import LogIn from './LogIn';
import Register from './Register';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleProvider } from 'native-base';

const LogInRoute=createStackNavigator();


const LoginScreen = ({navigation}) =>{
    const goBack = ()=>navigation.pop()

    return (
        
        <LogInRoute.Navigator screenOptions={ { headerShown: false,  } }>
            <LogInRoute.Screen name='Login' >
                { props => <LogIn {...props} goBack={goBack}/> }
            </LogInRoute.Screen>
            <LogInRoute.Screen name='Register'>
                { props => <Register { ...props } goBack={ goBack } /> }
            </LogInRoute.Screen>
        </LogInRoute.Navigator>
        
    )
}

export default LoginScreen
