import React, { Component } from 'react';
import '../container/index.css';
class Employeelist extends Component {

    render() {
        return (
            <div>
                <table >
                    <thead>
                        <tr>
                            <th>Profile</th>
                            <th>FirstName</th>
                            <th>LastName</th>
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
                                    <td><img src={tablerows.img} alt="test" className="tableProfile" /></td>
                                    <td>{tablerows.fname}</td>
                                    <td>{tablerows.lname}</td>
                                    <td>{tablerows.id}</td>
                                    <td>{tablerows.email}</td>
                                    <td>{tablerows.gender}</td>
                                    <td>{tablerows.phone}</td>
                                    <td>{tablerows.dob}</td>
                                    <td>{tablerows.communicationaddress}</td>
                                    <td>{tablerows.permanentaddress}</td>
                                    <td  >
                                        <button className="tableButton" onClick={() => this.props.editForm(tablerows.id)}>Edit</button>
                                        <button className="tableButton" onClick={this.props.deleteRow}>Delete</button>
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
