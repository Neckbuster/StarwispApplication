import React from 'react'; 

class Userinfo extends React.Component
{
  constructor(props){
    super(props);

  }

  render(){
    return <div style={{backgroundColor:"#f7f7f7",width:"15rem" ,position:"relative" ,left:"67rem",top:"5rem"}}>
        <div style={{borderRadius:"50%",height:"5rem",width:"5rem",backgroundColor:"white",margin:"1rem auto"}}>&nbsp;</div>
        <h3 style = {{color:"#4CAF50" ,textAlgin:"center",fontFamily:"Roboto"}}>Hello, <span style={{fontWeight:"1000"}}>{localStorage.userid}</span></h3>
    </div>
  }
}
export default Userinfo;
