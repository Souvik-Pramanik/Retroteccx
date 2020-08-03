import React, { Component } from 'react';
import './css/styles.css';
import { API } from './API';

class Register extends Component{

    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            department: '',
            city: '',
            present_address: '',
            permanent_address: '',
            mobile_number: '',
            aadhar_id: ''
        }
    }

    register = ()=>{
            fetch(API + '/adminregister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.firstname + ' ' + this.state.lastname,
                    email: this.state.email,
                    password: this.state.password,
                    department: this.state.department,
                    city: this.state.city,
                    present_address: this.state.present_address,
                    permanent_address: this.state.permanent_address,
                    mobile: Number(this.state.mobile_number),
                    aadhar: Number(this.state.aadhar_id)
                })
            })
                .then(response => {
                    console.log(response)
                    if (!response.ok) {

                        throw new Error('Network response was not ok');
                    }
                    return response.json()})
                .then((data) => {
                    if (data == 'success') {
                        alert('Registration successfull. Please signin.')
                        this.props.goTo('signin');
                    } else  {
                        alert('Could not register')
                    }
                })
                .catch(error=>alert('There was a connection or server problem'))
    }

    render(){
        return (
            <div class="bg-primary vh-100">
                <div id="layoutAuthentication">
                    <div id="layoutAuthentication_content">
                        <main class="vh-100">
                            <div class="container">
                                <div class="row justify-content-center">
                                    <div class="col-lg-7">
                                        <div class="card shadow-lg border-0 rounded-lg mt-5">
                                            <div class="card-header"><h3 class="text-center font-weight-light my-4">Create Account</h3></div>
                                            <div class="card-body">
                                                <form id="form">
                                                    <div class="form-row">
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="small mb-1" for="first_name">First Name</label>
                                                                <input onChange={(txt)=>this.setState({firstname: txt.target.value})} class="form-control py-4" id="first_name" type="text" placeholder="Enter first name" required/>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="small mb-1" for="last_name">Last Name</label>
                                                                <input onChange={ (txt) => this.setState({ lastname: txt.target.value }) } class="form-control py-4" id="last_name" type="text" placeholder="Enter last name" required/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="small mb-1" for="email">Email</label>
                                                        <input onChange={ (txt) => this.setState({ email: txt.target.value }) } class="form-control py-4" id="email" type="email" aria-describedby="emailHelp" placeholder="Enter email address" required/>
                                                    </div>
                                                    <div class="form-row">
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="small mb-1" for="password">Password</label>
                                                                <input onChange={ (txt) => this.setState({ password: txt.target.value }) } class="form-control py-4" id="password" type="password" placeholder="Enter password" required/>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="small mb-1" for="department">Department</label>
                                                                <input onChange={ (txt) => this.setState({ department: txt.target.value }) } class="form-control py-4" id="department" type="text" placeholder="Department" required/>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="small mb-1" for="city">City</label>
                                                                <input onChange={ (txt) => this.setState({ city: txt.target.value }) } class="form-control py-4" id="city" type="text" placeholder="City" required/>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="small mb-1" for="present_address">Present Address</label>
                                                                <input onChange={ (txt) => this.setState({ present_address: txt.target.value }) } class="form-control py-4" id="present_address" type="text" placeholder="Present Address" required />
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="small mb-1" for="permanent_address">Permanent Address</label>
                                                                <input onChange={ (txt) => this.setState({ permanent_address: txt.target.value }) } class="form-control py-4" id="permanent_address" type="text" placeholder="Permanent Address" required/>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="small mb-1" for="mobile_number">Mobile Number</label>
                                                                <input onChange={ (txt) => this.setState({ mobile_number: txt.target.value }) } class="form-control py-4" id="mobile_number" type="number" placeholder="Mobile Number" required/>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="form-group">
                                                                <label class="small mb-1" for="aadhar_id">Aadhar Identification</label>
                                                                <input onChange={ (txt) => this.setState({ aadhar_id: txt.target.value }) } class="form-control py-4" id="aadhar_id" type="text" placeholder="Aadhar Identification" required/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-group mt-4 mb-0" onClick={()=>{this.register()}}><a class="btn btn-primary btn-block">Create Account</a></div>
                                                </form>
                                            </div>
                                            <div class="card-footer text-center">
                                                <div class="small" onClick={()=>this.props.goTo('signin')}><a class="dim pointer">Have an account? Go to login</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register