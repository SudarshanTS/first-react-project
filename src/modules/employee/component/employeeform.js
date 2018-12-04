import React, { Component } from 'react';
import '../container/index.css';
import Employeelist from './employeelist';
class Employeeform extends Component{
    constructor(props){
        super(props);
        this.fileInput = React.createRef();
    }
    state = {
        rows: [],
        tableDisplay:false,
        currentValue : {
             name: "",
             email: "",
             gender:'',       
             phone: "",
             dob: "",  
             communicationaddress:"",
             permanentaddress:"",
             
        },
        text:"Create",
        editId:false,
        edit:0,
        errors: {},
        formIsValid:true,
        ischecked:false,
        selectedFile: null,
     }
    setVarible(event,key){
        const currentValue = this.state.currentValue;
        currentValue[key] = event.target.value;
        this.setState({currentValue});
        this.validateForm(currentValue);
        if(this.state.ischecked){
            currentValue.permanentaddress="";
             this.setState({ischecked:false,
            currentValue})
        }
      
    }
    
    handleChecked(){
        const currentValue=this.state.currentValue
        this.setState({
            ischecked:true
           
        })
     setTimeout(()=>{
        if(this.state.ischecked){
           currentValue.permanentaddress=currentValue.communicationaddress
            this.setState({currentValue})
        }
      
       },0) 
    }
   create=(e)=>{
       e.preventDefault();
       this.save();
          
    } 
save=()=>{
    const rows = this.state.rows;
    const editRowId=this.state.editId;
    // const formIsValid=this.state.formIsValid;
    console.log(this.state.currentValue)   
 if(editRowId === true){
       rows[this.state.edit]=this.state.currentValue
       this.clear()    
    }
    else{
        rows.push({...this.state.currentValue,id:rows.length});
        this.clear()
    }
    this.setState({
        rows,
        tableDisplay: rows.length > 0,
        text:"Create",
  }); 
  console.log(rows)
  
}
validateForm(currentValue) {
    let errors = {};
    
  if (currentValue.name==="") {
      errors.name = "*Please enter your username.";
     
    }
  else if (typeof currentValue.name !== "undefined") {
      if (!currentValue.name.match(/^[a-zA-Z]+$/)) {
         errors.name = "*Please enter alphabet characters only.";
        
        }
       
    }
    if (currentValue.email===""){
       errors.email = "*Please enter your email-ID.";
      
    }
  else if (typeof [currentValue.email] !== "undefined") {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(currentValue.email)) {
        errors.email = "*Please enter valid email-ID.";
       
      }
    }
    if (currentValue.gender===""){
        errors.gender = "*Please fill the gender.";
       
      }
    if (currentValue.phone===""){
      errors.phone = "*Please enter your mobile no.";
     
    }

   else if (typeof [currentValue.phone] !== "undefined") {
       const pattern=new RegExp(/^[0-9]{10}$/); 
      if (!pattern.test(currentValue.phone)) {
         errors.phone = "*Please enter valid mobile no.";
       
      }
      
    }

    this.setState({
      errors: errors,
    
    });
    
  }
    clear=()=>{
     document.getElementsByClassName("employeeForms")[0].reset();
     this.setState({
        currentValue : {
            name: "",
            email: "",
            gender:" ",
            phone: "",
            address:"",
            dob: "",  
            communicationaddress:"",
            permanentaddress:"",
            unique:1, 
       },
       ischecked:false
     })
    }
    fileChangedHandler = (event) => {
        this.setState({selectedFile: event.target.files[0]})
      }
     
    handleDeleteRow() {
        let rows = [...this.state.rows]
        rows.splice(0, 1)
        this.setState({ 
          rows: rows
        })
      }
    handleEditRow(i){
        this.setState({
       currentValue : {
                name: this.state.rows[i].name,
                id: this.state.rows[i].id,
                gender:this.state.rows[i].gender,
                email: this.state.rows[i].email,
                phone: this.state.rows[i].phone,
                dob: this.state.rows[i].dob,  
                communicationaddress:this.state.rows[i].communicationaddress,
                permanentaddress:this.state.rows[i].permanentaddress,
                
        },  
        editId:true,
        text:"Update",
        edit:i
     })
 } 
render(){ 
         return (
         <div className="Wapper">
          <form className="employeeForms">
             <label>Name<span className="required">*</span></label><input className="inputField" value={this.state.currentValue.name} onChange={(e)=>this.setVarible(e,"name")}type="text" ></input>
             <div className="errorMsg">{this.state.errors.name}</div>
             <label>Email <span className="required">*</span></label><input  className="inputField" value={this.state.currentValue.email} onChange={(e)=>this.setVarible(e,"email")}  type="email"></input>
             <div className="errorMsg">{this.state.errors.email}</div>
             <div className="radioButton">
             <label>Gender <span className="required">*</span></label>
                <label>
                <input type="radio" value="male" checked={this.state.currentValue.gender === 'male'} 
                  onChange={(e)=>this.setVarible(e,"gender")} />
                 Male
                </label>
                <label>
                <input type="radio" value="female" checked={this.state.currentValue.gender === 'female'} 
                 onChange={(e)=>this.setVarible(e,"gender")}/>
                 Female
                </label>
            </div>
            <div className="errorMsg">{this.state.errors.gender}</div>   
             <label>Phone <span className="required">*</span></label><input className="inputField"  value={this.state.currentValue.phone} onChange={(e)=>this.setVarible(e,"phone")}type="number"></input>
             <div className="errorMsg">{this.state.errors.phone}</div>
             <label>DOB <span className="required">*</span></label><input  className="inputField"  value={this.state.currentValue.dob} onChange={(e)=>this.setVarible(e,"dob")}  type="Date"></input>
             <label>Communication Address <span className="required">*</span></label><textarea   value={this.state.currentValue.communicationaddress} onChange={(e)=>this.setVarible(e,"communicationaddress")} type="text"></textarea>
             <div className="checkBox"><input type="checkbox" checked={this.state.ischecked} onChange={(e)=>this.handleChecked(e)}/><span>Is Communication address is same as Permanent address</span></div>
             <label>Permanent Address <span className="required">*</span></label><textarea  value={this.state.currentValue.permanentaddress} onChange={(e)=>this.setVarible(e,"permanentaddress")} type="text"></textarea>
             <div className="errorMsg">{this.state.errors.address}</div>
             <div className="imageUpload">
             <input type="file" ref={this.fileInput} onChange={this.fileChangedHandler} className="inputFile" />
             {/* <button onClick={this.uploadHandler}>Upload!</button> */}
             </div>
             <div className='Button'>
            <button id="button" className="buttonStyle" onClick={(e)=>this.create(e)}>{this.state.text}</button>
          </div>
       </form>
    <div>{this.state.tableDisplay ? 
          <Employeelist rows={this.state.rows}  
          deleteRow={()=>this.handleDeleteRow()}
          editForm={(rowID)=>this.handleEditRow(rowID)} 
          id={this.state.tableCellId}
           />:""}
    </div>
    </div>
    )
     }
 }
 export default Employeeform;
