import React ,{ Component}from 'react';
import '../container/index.css';
class  Employeelist extends Component{
      
    render(){
        return (
        <div>            
    <table >
    <thead>
    <tr>
             <th>Name</th>
             <th>Id</th>
             <th>Email</th>
             <th>Gender</th>
             <th>Phone</th>
             <th>DOB</th>
             <th>CommunicationAddress</th>
             <th>PermanentAddress</th>
             <th>Action</th>
         </tr> 
         </thead>
    <tbody>
         {this.props.rows.map(tablerows => {
             return (
                <tr key={Math.random()} >
                <td>{tablerows.name}</td>
                <td>{tablerows.id}</td> 
                <td>{tablerows.email}</td>
                <td>{tablerows.gender}</td>
                <td>{tablerows.phone}</td> 
                <td>{tablerows.dob}</td>
                <td>{tablerows.communicationaddress}</td>
                <td>{tablerows.permanentaddress}</td>
                <td  className="tableButton">
                 <button  onClick={()=>this.props.editForm(tablerows.id)}>Edit</button>
                 <button id="deleteRows" onClick={this.props.deleteRow}>Delete</button>
      </td>
                </tr>
             )
         })}
         
    </tbody>

  </table>
  </div>
  )
 }
  
}
export default Employeelist;
