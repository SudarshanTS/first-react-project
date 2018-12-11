import React from 'react';
import Employeelist from './employeelist';
let Routing=(props)=>{
  return(<Employeelist rows={props.rows}
    deleteRow={() => props.handleDeleteRow()}
    editForm={(rowID) => props.handleEditRow(rowID)}/>)  
  }
export  default Routing;