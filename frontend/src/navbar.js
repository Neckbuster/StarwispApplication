import React from 'react'; 
import axios from 'axios';
class Navbar extends React.Component
{
  constructor(props){
    super(props);

    this.handleView = this.handleView.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleAdd(){
 	this.props.setNew();
  }

  handleView(){
  	this.props.setShow();
  }
  handleClick(){
    axios.get('/logout')
    .then(res=>{
      window.location.reload();
    })
  }
  render(){
    return(
    	<div>
		  <nav class="navbar navbar-expand-lg navbar-light bg-light">
		  <a class="navbar-brand" href="#">Starwisp Industries</a>
		  <button class="btn btn-outline-success my-lg-2 my-2 my-sm-0" style={{marginRight:'45rem',marginLeft:'5rem'}} onClick={this.handleView}>View</button>
		  <button class="btn btn-outline-warning my-lg-2 my-2 my-sm-0" onClick={this.handleAdd}>Add</button>
      <a class="nav-link" onClick = {this.handleClick}href="#">Logout</a>
		</nav>
		</div>
    )
  }
}
export default Navbar;
