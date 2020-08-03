import React, { Component } from 'react';
import TextInputMask from 'react-native-text-input-mask';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, TextInput } from "react-native-paper";
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import NetInfo from "@react-native-community/netinfo";
import { setGlobalState } from '../../Actions/Actions';
// import fetch from '../../API/Fetch';
import {Root, Toast} from 'native-base';
import { API } from '../../Constants/ActionTypes';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const mapStateToProps = state => {
    return {
        fromReport: state.fromReport,
        email: state.email
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setGlobalState: (info) => dispatch(setGlobalState(info))
    }
}

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Please enter a valid email adddress')
        .required('This is a required feild'),
    password: yup
        .string()
        .min(8)
        .max(16)
        .matches(/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, { message: 'Password must have at least 8 charactes, 1 letter, 1 number and 1 special character', excludeEmptyString: true })
        .required('This is a required feild'),
    confirmpass: yup
        .string()
        .required('This is a required feild')
        .test('passwords-match', 'Passwords did not match', function (value) {
            return this.parent.password === value;
        }),
    firstname: yup
        .string()
        .required('This is a required feild')
        .matches(/^[a-zA-Z]+$/, {message: "Firstname should only contain letters", excludeEmptyString: true}),
    middlename: yup
        .string()
        .matches(/^[a-zA-Z]+$/, { message: "Middlename should only contain letters", excludeEmptyString: true }),
    lastname: yup
        .string()
        .required('This is a required feild')
        .matches(/^[a-zA-Z]+$/, { message: "Lastname should only contain letters", excludeEmptyString: true }),
    mobile: yup
        .number()
        .min(10)
        .positive()
        .required('This is a required feild')
        .integer(),
})

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
        aadhar: null,
        connected: true,
        loading: false
    };
    NetInfo.fetch().then((c) => {
        if (!c.isConnected) {
            Toast.show({
                text: "Please check your internet connection.",
                buttonText: "Okay",
                duration: 3000
            });
            this.setState({ connected: false })
        }
    });
  }

    registerUser(values) {
        this.setState({loading: true})
        if (this.state.connected) {
            fetch(API+'/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.confirmpass,
                    username: values.firstname + ' ' + values.middlename + ' ' + values.lastname,
                    aadhar: this.state.aadhar,
                    mobile: values.mobile,
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    this.setState({ loading: false })
                    switch (data) {
                        
                        case 'success':
                            Toast.show({
                                text: "Sign up successful! Now you can login.",
                                buttonText: "Thank you",
                                duration: 2000
                            });
                            setTimeout(() => {
                                this.props.navigation.pop();
                            }, 2100);
                            break;
                        case 'failed':
                            Toast.show({
                                text: "Sign up falied.",
                                buttonText: "Okay",
                                duration: 3000
                            });
                            break;
                        default:
                            Toast.show({
                                text: "Login falied!",
                                buttonText: "Okay",
                                duration: 3000
                            });
                            break;
                    }
                })
                .catch(() => {
                    this.setState({ loading: false })
                    Toast.show({
                        text: "Request timed out. Please try again after few minutes.",
                        buttonText: "Okay",
                        duration: 3000
                    });
                })

        } else {
            this.setState({ loading: false })
            Toast.show({
                text: "Internet connection is required fro signing up.",
                buttonText: "Okay",
                duration: 3000
            });
        }
    }

  render() {

    return (
        <Root>
            <View style={ style.container }>
                <LinearGradient
                    colors={ ['#FF9933', '#FFFFFF', '#138808'] }
                    style={ style.linearGradient }
                >
                    <KeyboardAvoidingView
                        keyboardVerticalOffset={-50}
                        behavior={ Platform.OS == "ios" ? "padding" : "position" }
                        style={ {
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center'
                        } }
                    >
                        <ScrollView contentContainerStyle={ style.scrollview } showsVerticalScrollIndicator={ false }>
                            <View
                                style={ {

                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: 30,
                                } }>
                                <Image source={ require('../../Images/BPRD-bkg.png') } style={ style.logo } />
                                {
                                    (this.props.fromReport) ?
                                        (
                                            <Text style={ { color: 'red', alignSelf: 'flex-start', marginTop: 15, marginLeft: 10 } }>
                                                You must logged in before reporting
                                            </Text>
                                        ) : (<></>)
                                }

                                <Formik
                                    initialValues={ {
                                        email: "",
                                        password: '',
                                        confirmpass:'',
                                        firstname: '',
                                        middlename: '',
                                        lastname: '',
                                        mobile: null,
                                    } }
                                    validationSchema={validationSchema}
                                    onSubmit={ values => this.registerUser(values) }
                                    >

                                    { ({ handleChange, handleBlur, handleSubmit, values, errors, setFieldTouched, touched, isValid,}) => (
                                        <View style={ style.container }>
                                            <TextInput
                                                style={ style.input }
                                                autoFocus={ true }
                                                inlineImageLeft='email'
                                                inlineImagePadding={ 20 }
                                                placeholder='Email...'
                                                placeholderTextColor='#7B7470'
                                                // onBlur={()=>this.checkRegistered()}
                                                onChangeText={ 
                                                    handleChange('email')
                                                    }
                                                onBlur={ handleBlur('email') }
                                                value={ values.email }
                                            />
                                            { touched.email && errors.email &&
                                                <Text style={ { fontSize: 12, alignSelf: 'flex-start', color: 'red' } }>{ errors.email }</Text>
                                            }
                                            <TextInput
                                                style={ style.input }
                                                inlineImageLeft='name'
                                                inlineImagePadding={ 20 }
                                                placeholder='First Name...'
                                                placeholderTextColor='#54524D'
                                                onChangeText={ handleChange('firstname') }
                                                onBlur={ handleBlur('firstname') }
                                                value={ values.firstname }
                                            />
                                            { touched.firstname && errors.firstname &&
                                                <Text style={ { fontSize: 12, alignSelf: 'flex-start', color: 'red' } }>{ errors.firstname }</Text>
                                            }
                                            <TextInput
                                                style={ style.input }
                                                inlineImageLeft='name'
                                                inlineImagePadding={ 20 }
                                                placeholder='Middle Name...'
                                                placeholderTextColor='#54524D'
                                                onChangeText={ handleChange('middlename') }
                                                onBlur={ handleBlur('middlename') }
                                                value={ values.middlename }
                                            />
                                            { touched.middlename && errors.middlename &&
                                                <Text style={ { fontSize: 12, alignSelf: 'flex-start', color: 'red' } }>{ errors.middlename }</Text>
                                            }
                                            <TextInput
                                                style={ style.input }
                                                inlineImageLeft='name'
                                                inlineImagePadding={ 20 }
                                                placeholder='Last Name...'
                                                placeholderTextColor='#54524D'
                                                onChangeText={ handleChange('lastname') }
                                                onBlur={ handleBlur('lastname') }
                                                value={ values.lastname }
                                            />
                                            { touched.lastname && errors.lastname &&
                                                <Text style={ { fontSize: 12, alignSelf: 'flex-start', color: 'red' } }>{ errors.lastname }</Text>
                                            }
                                            <TextInput
                                                keyboardType='numeric'
                                                style={ style.input }
                                                inlineImageLeft='aadhar'
                                                inlineImagePadding={ 20 }
                                                placeholder='Enter Your 12 Digit Aadhar Number...'
                                                placeholderTextColor='#54524D'
                                                // onChangeText={ handleChange('aadhar') }
                                                onBlur={ handleBlur('aadhar') }
                                                value={ this.state.aadhar }
                                                render={ props =>
                                                    <TextInputMask
                                                        { ...props }
                                                        onChangeText={ (formatted, extracted) => {
                                                            this.setState({aadhar: extracted})
                                                        } }
                                                        mask="[0000] [0000] [0000]"
                                                    />
                                                }
                                            />
                                            <TextInput
                                                keyboardType='numeric'
                                                style={ style.input }
                                                inlineImageLeft='phone'
                                                inlineImagePadding={ 20 }
                                                placeholder='Phone Number...'
                                                placeholderTextColor='#54524D'
                                                onChangeText={ handleChange('mobile') }
                                                onBlur={ handleBlur('mobile') }
                                                value={ values.mobile }
                                                render={ props =>
                                                    <TextInputMask
                                                        { ...props }
                                                        mask="[0000000000]"
                                                    />
                                                }
                                            />
                                            { touched.mobile && errors.mobile &&
                                                <Text style={ { fontSize: 12, alignSelf: 'flex-start', color: 'red' } }>{ errors.mobile }</Text>
                                            }
                                            <TextInput
                                                style={ style.input }
                                                inlineImageLeft='password'
                                                inlineImagePadding={ 20 }
                                                placeholder='Password...'
                                                placeholderTextColor='#7B7470'
                                                // onFocus={ () => this.checkRegistered() }
                                                secureTextEntry={true}
                                                onChangeText={ handleChange('password') }
                                                onBlur={ handleBlur('password') }
                                                value={ values.password }
                                            />
                                            { touched.password && errors.password &&
                                                <Text style={ { fontSize: 12, alignSelf: 'flex-start', color: 'red' } }>{ errors.password }</Text>
                                            }
                                            <TextInput
                                                style={ style.input }
                                                inlineImageLeft='password'
                                                inlineImagePadding={ 20 }
                                                placeholder='Consfirm Password...'
                                                placeholderTextColor='#7B7470'
                                                // onFocus={ () => this.checkRegistered() }
                                                onChangeText={ handleChange('confirmpass') }
                                                onBlur={ handleBlur('confirmpass') }
                                                secureTextEntry={true}
                                                value={ values.confirmpass }
                                            />
                                            { touched.confirmpass && errors.confirmpass &&
                                                <Text style={ { fontSize: 12, alignSelf: 'flex-start', color: 'red' } }>{ errors.confirmpass }</Text>
                                            }
                                            <Button
                                                icon='check-circle'
                                                contentStyle={ {
                                                    height: 50,
                                                    width: windowWidth * 0.7,
                                                    backgroundColor: (isValid) ? 'rgba(50,8,243,0.8)' :'rgba(108,108,121,1)'
                                                } }
                                                style={ { marginTop: 20 } }
                                                labelStyle={ {
                                                    color: 'white'
                                                } }
                                                loading={this.state.loading}
                                                disabled={!isValid}
                                                onPress={handleSubmit}
                                                >
                                                Sign up
                                                </Button>
                                        </View>
                                    ) }
                                </Formik>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView> 
                </LinearGradient>
            </View >
        </Root>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register);



const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    input: {
        height: 40,
        backgroundColor: 'transparent',
        width: windowWidth * 0.8,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        margin: 10
    },
    scrollview: {
        alignItems: 'center',
        justifyContent: 'center',
        // marginVertical: 30,
        
    },
    linearGradient: {
        height: windowHeight,
        width: windowWidth,
    },
    logo: {
        height: 210,
        width: 210,
        resizeMode: "stretch",
        padding: 30,
        marginVertical: 10,
    }
})