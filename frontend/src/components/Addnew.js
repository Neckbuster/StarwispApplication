import React from 'react'; 
import axios from 'axios';
class Addnew extends React.Component
{
  constructor(props){
    super(props);

    this.state = {
      uniname:"",
      weburl :"",
      contact:0,
      regdate:"",
      expdate:"",
      imgurl:"",
      numstud:0,
      email:""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    var data = {}
    data['uniname'] = this.state.uniname;
    data['weburl']  = this.state.weburl;
    data['contact'] = this.state.contact;
    data['regdate'] = this.state.regdate;
    data['expdate'] = this.state.expdate;
    data['imgurl']  = this.state.imgurl;
    data['numstud'] = this.state.numstud;
    data['email']   = this.state.email;

    if(this.state.contact>9999)
    {
      alert("Contact Too big maximum 4 digits");
      return;
    }

    axios.post('/create',data)
    .then((res)=>{
      alert("Record Inserted Successfully!!!");
    })

  }

  handleChange(e){
    this.setState({[e.target.name]:e.target.value});
  }

  render(){
    return <div style={{backgroundColor:"#f7f7f7",position:"relative",top:"-5rem",left:"5rem",width:"40rem"}}>
      <form style={{padding:"2rem"}} onSubmit={this.handleSubmit}>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={this.handleChange}/>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">University Name</label>
          <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="uniname" onChange={this.handleChange}/>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Web Url</label>
          <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="weburl" onChange={this.handleChange}/>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Registeration date</label>
          <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="regdate" onChange={this.handleChange} required/>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Expiry address</label>
          <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="expdate" onChange={this.handleChange} required/>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Image URL</label>
          <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="imgurl" onChange={this.handleChange}/>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">No of Students</label>
          <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="numstud" onChange={this.handleChange}/>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Contact</label>
          <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="contact" onChange={this.handleChange} required/>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    </div>
  }
}
export default Addnew;
