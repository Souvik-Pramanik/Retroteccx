import React, { Component } from 'react';
import '../App.css';
import { Button } from 'react-bootstrap';
import { API } from "./API";

class Signin extends Component{

    constructor(props){
        super(props)
        this.state={
            email: 'mal@mal.mal',
            password: 'malmal1!'
        }
    }

    signIn=()=>{
        if (this.state.email != '' && this.state.password != '')
        fetch(API + '/adminsignin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(res=>res.json())
        .then((data)=>{
            if(data.status == 'success'){
                this.props.setState({admin_id: data.admin_id, token: data.token});
                this.props.goTo('home');
            }
            else if(data == 'wrong cred'){
                alert('Check your email/password')
            }
            else if(data == 'failed'){
                alert('You are not registered')
                this.props.goTo('register')
            }
        })
        .catch(console.log)
    }

    render(){
        return (
            <div class="bg-primary vh-100">
                <div id="layoutAuthentication bg-primary">
                    <div id="layoutAuthentication_content">
                        <main>
                            <div class="container justify-content-center">
                                <div class="row justify-content-center">
                                    <div class="col-lg-5">
                                        <div class="card shadow-lg border-0 rounded-lg mt-5">
                                            <div class="card-header"><h3 class="text-center font-weight-light my-4">Login</h3></div>
                                            <div class="card-body">
                                                <form id="form">
                                                    <div class="form-group">
                                                        <label class="small mb-1" for="email">Email</label>
                                                        <input onChange={ (txt) => this.setState({ email: txt.target.value }) } class="form-control py-4" id="email" type="email" placeholder="Enter email address" required/>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="small mb-1" for="password">Password</label>
                                                        <input onChange={ (txt) => this.setState({ password: txt.target.value }) } class="form-control py-4" id="password" type="password" placeholder="Enter password" required/>
                                                    </div>
                                                    {/* <div class="form-group">
                                                    <div class="custom-control custom-checkbox">
                                                        <input class="custom-control-input" id="rememberPasswordCheck" type="checkbox" />
                                                        <label class="custom-control-label" for="rememberPasswordCheck">Remember password</label>
                                                    </div>
                                                </div> */}
                                                    <div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                                        {/* <a class="small" href="password.html">Forgot Password?</a> */ }
                                                        <Button variant="primary" size="lg" block onClick={()=>this.signIn()}>Log in</Button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="card-footer text-center">
                                                <Button variant="outline-primary" block onClick={ ()=>this.props.goTo('register') }>Register</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                    {/* <div id="layoutAuthentication_footer">
                    <footer class="py-4 bg-light mt-auto">
                        <div class="container-fluid">
                            <div class="d-flex align-items-center justify-content-between small">
                                <div class="text-muted">Copyright &copy; Your Website 2020</div>
                                <div>
                                    <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div> */}
                </div>
            </div>
        )
    }
}
export default Signin;