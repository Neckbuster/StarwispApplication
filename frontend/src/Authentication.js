import React, { Component } from "react";
import App from "./App";
import Login from "./login"
import axios from 'axios';
class Authentication extends Component {
    constructor() {
        super();
        this.state = {
        user: null,
        isNew : false,
        isRender : false
    };
    this.authListener = this.authListener.bind(this);
}

componentDidMount() {
    this.authListener();
}   

authListener() {
    axios.get('/isAuthenticated')
    .then((res)=>{
        if(res.data.User){
            
            localStorage.setItem("userid",res.data.User);
            this.setState({isRender:true});
        }
        else{
            this.setState({isRender:false});
            localStorage.removeItem("userid");
        }
    })
}
render() {
    return <div>{this.state.isRender ? <App/>: <Login/>}</div>
    }
}

export default Authentication;