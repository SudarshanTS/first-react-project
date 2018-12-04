import React, {Component} from 'react';
import User from './User';

class Users extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"sudarshan"
         };    
    }    
Changetheage = (newName)=>{
         this.setState({
            name:newName
         })
     }
    render(){
        return(<div>
              <User doWhatever={()=>this.Changetheage("sid") } name={this.state.name}/>   
              <User doWhatever={()=>this.Changetheage("sat") } name={this.state.name}/>   
            </div>)
    }
}
export default Users