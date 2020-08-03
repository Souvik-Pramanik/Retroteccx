import React, {Component} from 'react';
import { View, StyleSheet, Text, Pressable, ClippingRectangle } from 'react-native';
import Animated from 'react-native-reanimated';
import {StackActions} from '@react-navigation/native';
import {connect} from 'react-redux';
import { setGlobalState, setfromReport} from '../../Actions/Actions';
import {
    Avatar,
    Title,
    Drawer,
    Caption,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const mapStateToProps=(state)=>{
    console.log(state)
    return{
        isSignedIn: state.LoggedIn,
        UserName: state.UserName,
        currentRoute: state.currentRoute
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        setGlobalState: (obj) => dispatch(setGlobalState(obj)),
        setFromReport: (value)=>dispatch(setfromReport(value)),
    }
}

var translateX;
class CustomDrawerContent extends Component {
    
    constructor(props){
        super(props)
        translateX = Animated.interpolate(this.props.progress, {
            inputRange: [0, 1],
            outputRange: [-5000, 0],
        });
    }

    generateName(name){
        let n = "";
        for(let i of name){
            n+=i+' ';
        }
        return n;
    }

    render(){   
        return (
            <Animated.View style={ { flex: 1, transform: [{ translateX }] } }>
                <View style={ { flex: 1 } }>
                    <DrawerContentScrollView { ...this.props }>
                        <View style={ styles.drawerContent }>
                            <View style={ styles.userInfoSection }>
                                    {this.props.isSignedIn ? 
                                        (<View style={ { flexDirection: 'row', marginTop: 15 } }>
                                            <Avatar.Text
                                                size={ 46 }
                                                label = { this.props.UserName[0][0]+this.props.UserName[2][0]}
                                            />
                                            <View style={ { marginLeft: 15} }>
                                                <Caption style={styles.caption}>Welcome</Caption>
                                                <Title style={ styles.title }>{ this.generateName(this.props.UserName) }</Title>
                                            </View>                                    
                                        </View>
                                        )
                                        :
                                        (
                                        <View style={ { flexDirection: 'row', marginTop: 15 } }>
                                            <Avatar.Icon
                                                size={ 46 }
                                                icon='account'
                                            />
                                            <View style={ { marginLeft: 15, marginTop: 2, flexDirection: 'column' } }>
                                                <Caption style={ styles.caption }>
                                                    You are not logged in
                                                </Caption>
                                                <Pressable hitSlop={8} onPress={ () => {
                                                    this.props.setFromReport(false)
                                                    this.props.navigation.navigate('Login')
                                                    } }>
                                                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                                                        Sign in/Sign up
                                                    </Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                        )
                                    }
                            </View>

                            <Drawer.Section style={ styles.drawerSection }>
                                <DrawerItem
                                    icon={ ({ color, size }) => (
                                        <Icon
                                            name="home-outline"
                                            color={ color }
                                            size={ size }
                                        />
                                    )}
                                    label="Home"
                                    onPress={ () => { this.props.navigation.navigate('Home') } }
                                />

                                {(this.props.isSignedIn)?
                                    (<DrawerItem
                                    icon={ ({ color, size }) => (
                                        <Icon
                                            name="book-open-outline"
                                            color={ color }
                                            size={ size }
                                        />
                                    ) }
                                    label="My Reports"
                                    onPress={ () => { this.props.navigation.navigate('MyReport') } }
                                />):(<></>)}

                                <DrawerItem
                                
                                    icon={ ({ color, size }) => (
                                        <Icon
                                            name="alert-plus"
                                            color={ color }
                                            size={ size }
                                        />
                                    ) }
                                    label="Report Bribery"
                                    onPress={ () => {
                                        if (this.props.isSignedIn)
                                            this.props.navigation.navigate('Report')
                                        else{
                                            this.props.setFromReport(true)
                                            this.props.navigation.navigate('Login')
                                        }
                                        } }
                                />
                                <DrawerItem
                                    icon={ ({ color, size }) => (
                                        <Icon
                                            name="emoticon"
                                            color={ color }
                                            size={ size }
                                        />
                                    ) }
                                    label="About us"
                                    onPress={ () => { this.props.navigation.navigate('AboutUs') } }
                                />
                            </Drawer.Section>
                        </View>
                    </DrawerContentScrollView>

                    {(this.props.isSignedIn)?
                        (<Drawer.Section style={ {
                            backgroundColor: 'transparent',
                            
                        } }>
                            <DrawerItem
                                icon={ ({ color, size }) => (
                                    <Icon
                                        name="exit-to-app"
                                        color={ color }
                                        size={ size }
                                    />
                                ) }
                                label="Sign Out"
                                onPress={ () => {
                                    this.props.setGlobalState({
                                        LoggedIn: false,
                                        UserName: ['', '', ''],
                                        email: '',
                                        Reports: [],
                                        fromReport: false,
                                        token: ''
                                    })
                                    this.props.navigation.navigate('Home')
                                    this.props.navigation.closeDrawer()
                                } }
                            />
                    </Drawer.Section>):(<></>)
                }
                </View>
            </Animated.View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContent);
// export default CustomDrawerContent;

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
        paddingBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});