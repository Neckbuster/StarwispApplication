import React from 'react'; 
import axios from 'axios';
class Show extends React.Component
{
  constructor(props){
    super(props);
    this.state =  {
      datalist: [],
      rowlist:[],
      lc:0,
      rc:2,
      lca:0,
      rca:2
    }

    this.incRows = this.incRows.bind(this);
    this.decRows = this.decRows.bind(this);
  }

  incRows(){

    this.setState({"lc":this.state.lca});
    this.setState({"rc":this.state.rca});

    var limit = 3;
    var tmp   = [] ; 
    var ccnt = this.state.lca;
    // alert(this.state.lca+" "+this.state.rca);
    var size =  this.state.datalist.length;
    // alert(size)
    while(limit--){
      if(ccnt<=this.state.rca){
          var data = this.state.datalist[ccnt];
          tmp.push(<tr><td>{data["uniname"]}</td><td>{data["weburl"]}</td><td>{data["contact"]}</td><td>{data["imgurl"]}</td><td>{data["expdate"]}</td><td>{data["regdate"]}</td><td>{data["numstud"]}</td><td>{data["email"]}</td><td><button class="btn danger">X</button></td></tr>)
          ccnt++;
      }
      else{
        break;
      }
    }
    this.setState({"lca":ccnt});
    this.setState({"rca":Math.min(ccnt+2,size-1)});
    this.setState({"rowlist":tmp });

  }

  decRows(){
    this.setState({"lc":this.state.lca});
    this.setState({"rc":this.state.rca});

    var limit = 3;
    var tmp   = [] ; 
    var ccnt = this.state.lca-1;
    var size =  this.state.datalist.length;
    while(limit--){
      if(ccnt<=this.state.rca){
          var data = this.state.datalist[ccnt];
          tmp.push(<tr><td>{data["uniname"]}</td><td>{data["weburl"]}</td><td>{data["contact"]}</td><td>{data["imgurl"]}</td><td>{data["expdate"]}</td><td>{data["regdate"]}</td><td>{data["numstud"]}</td><td>{data["email"]}</td><td><button class="btn danger">X</button></td></tr>)
          ccnt--;
      }
      else{
        break;
      }
    }
    this.setState({"lca":ccnt});
    this.setState({"rca":Math.min(ccnt+2,size-1)});
    this.setState({"rowlist":tmp });

  }

  componentWillMount(){
    axios.get('/showdetail')
    .then((res)=>{
      this.setState({'datalist':res.data});
      this.incRows();
    })

  }

  render(){
    return <div style={{backgroundColor:"#f7f7f7",position:"relative",top:"-5rem",left:"5rem",width:"60rem"}}>
    <table class="table">
    <thead>
      <tr>
        <th scope="col">Uni Name</th>
        <th scope="col">Web Url</th>
        <th scope="col">Contact</th>
        <th scope="col">Img URL</th>
        <th scope="col">EXP. Date</th>
        <th scope="col">Reg. Date</th>
        <th scope="col">Num Stud</th>
        <th scope="col">Email</th>
        <th scope="col">Action</th>
      </tr>
      {this.state.rowlist}
  </thead>
    </table>
    {this.state.lc !=0 && <a href="#" style={{backgroundColor:"#f32013",color:"white",borderRadius:"50%",textDecoration:"none",display:"inline-block",padding:"8px 16px",margin:".5rem"}}>&#8249;</a>}
    {this.state.rc+1!=this.state.datalist.length && <a href="#" onClick={this.incRows} style={{backgroundColor:"#4CAF50",color:"white",borderRadius:"50%",textDecoration:"none",display:"inline-block",padding:"8px 16px",margin:".5rem"}}>&#8250;</a>}
    </div>
  }
}
export default Show;
