import React, { Component } from "react";
import App from "./App";
import axios from 'axios';
import './login.css'
class Login extends Component {
    constructor() {
        super();
        this.state = {
            username:"",
            password:""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(e){
    this.setState({[e.target.name]:e.target.value})
} 

handleSubmit(e){
    e.preventDefault();
    const data = {};
    data["username"] = this.state.username;
    data["password"] = this.state.password;
    axios.post('/login',data)
    .then((res)=>{
        if(res.data == "passuser"){
            window.location.reload();
        }
        else{
            alert(res.data);
        }
    })
    .catch((err)=>{
        alert("Some technical difficulty");
    });
}

render() {
    return <div>
    <div class="container">
        <h1>Login Page</h1> 
        <form onSubmit = {this.handleSubmit}>
      <div class="form-group">
        <label for="exampleInputEmail1">User-Name</label>
        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter User-Name" name="username" onChange={this.handleChange}/>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name="password" onChange={this.handleChange}/>
      </div>
      <button class="btn btn-primary btn-block">Submit</button>
      </form>
    </div>
    </div>
    }
}

export default Login;