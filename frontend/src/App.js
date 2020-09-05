import React from 'react'; 
import './App.css'; 
import Navbar from './navbar'
import Addnew from './components/Addnew.js'
import Show from './components/show.js'
import Userinfo from './components/userinfo.js'
class App extends React.Component
{
  constructor(props){
    super(props);
    this.state = {
    	isNew:false,
    	isShow:true
    }

    this.show = this.show.bind(this);
    this.addNew = this.addNew.bind(this);

  }

  show(){
  	this.setState({isNew:false});
  	this.setState({isShow:true});
  }

  addNew(){
  	this.setState({isShow:false});
  	this.setState({isNew:true});
  }

  render(){
  	let props = {
  		setShow : this.show,
  		setNew  : this.addNew
  	}
    return <div>
    <Navbar {...props}/>
    <Userinfo/>
    {this.state.isShow && <Show/>}
    {this.state.isNew && <Addnew/>}
    </div>
  }
}
export default App;
