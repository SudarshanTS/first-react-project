import React, { Component } from 'react';
import '../container/index.css';
import Employeelist from './employeelist';
import Upload from '../../../assets/images/Uploadimage'
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
        file: '',
        imagePreviewUrl: ''
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
        rows.push({...this.state.currentValue,id:rows.length,img:this.state.imagePreviewUrl});
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
        let reader = new FileReader();
        let file = event.target.files[0];
       
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
      console.log(this.state)
    }
    
    reader.readAsDataURL(file)
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
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="test" />);
    } 
         return (
         <div className="mainWapper">
          <form className="employeeForms">
          <div className="Wapper">
          <div className="imageUpload">
             <div className="imageContainer">
              <div style={{display: "flex",alignItems:"center",justifyContent:"space-evenly"}}>
              {$imagePreview}
               <div>{this.state.file.name}</div>
              </div>
              <div style={{display: "flex",justifyContent: "center"}}>
              <input type="file" ref={this.fileInput} onChange={this.fileChangedHandler} className="inputFile" />
               <div style={{position:"absolute"}}><Upload/></div>
              </div>
             </div>
            
             </div>
            <div>
            <div className="empolyeeName ">
            <div >
             <label>FirstName<span className="required">*</span></label><input className="inputField" value={this.state.currentValue.fname} onChange={(e)=>this.setVarible(e,"fname")}type="text" ></input>
             <div className="errorMsg">{this.state.errors.name}</div>
             </div>
             <div>
             <label>LastName<span className="required">*</span></label><input className="inputField" value={this.state.currentValue.lname} onChange={(e)=>this.setVarible(e,"lname")}type="text" ></input>
             <div className="errorMsg">{this.state.errors.name}</div>
             </div>
             </div>  
             <div className="gender-Phone">
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
                <div className="errorMsg">{this.state.errors.gender}</div>  
            </div>
           
            <div>
            <label>Phone <span className="required">*</span></label><input className="inputField"  value={this.state.currentValue.phone} onChange={(e)=>this.setVarible(e,"phone")}type="number"></input>
             <div className="errorMsg">{this.state.errors.phone}</div>
            </div>
            </div>
            </div>
            </div> 
            <div className="wapper2">
             <div>
                 <label>DOB <span className="required">*</span></label>
                 <input  className="inputField"  value={this.state.currentValue.dob} onChange={(e)=>this.setVarible(e,"dob")}  type="Date"></input>
             </div>
             <div>
             <label>Email <span className="required">*</span></label><input  className="inputField" value={this.state.currentValue.email} onChange={(e)=>this.setVarible(e,"email")}  type="email"></input>
             <div className="errorMsg">{this.state.errors.email}</div>
             </div>
             <div>
             <label>Role <span className="required">*</span></label>    
             <select>
                <option value="Trainer">Trainer</option>
                <option value="Designer">Designer</option>
                <option value="Devloper">Devloper</option>
                <option value="Hr">Hr</option>
            </select>
             </div>
             </div>
             <div className="wapper3">
             <div>
             <label>Communication Address <span className="required">*</span></label><textarea   value={this.state.currentValue.communicationaddress} onChange={(e)=>this.setVarible(e,"communicationaddress")} type="text"></textarea>
             <div className="checkBox"><input type="checkbox" checked={this.state.ischecked} onChange={(e)=>this.handleChecked(e)}/><span>Is Communication address is same as Permanent address</span></div>
             </div>
             <div>
             <label>Permanent Address <span className="required">*</span></label><textarea  value={this.state.currentValue.permanentaddress} onChange={(e)=>this.setVarible(e,"permanentaddress")} type="text"></textarea>
              </div>
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
