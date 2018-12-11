import React, { Component } from 'react';
import '../container/index.css';
import Routing from './RoutePath';
import Sample from '../../../assets/images/sample';
import {BrowserRouter as Router,Link} from 'react-router-dom';
import Route from 'react-router-dom/Route';
class Employeeform extends Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
    }
    state = {
        rows: [],
        tableDisplay: false,
        currentValue: {
            fname: "",
            lname: "",
            email: "",
            gender: '',
            phone: "",
            degree: "",
            dob: "",
            communicationaddress: "",
            permanentaddress: "",
            value: 'Trainer'
        },
        text: "Create",
        editId: false,
        edit: 0,
        errors: {},
        formIsValid: true,
        ischecked: false,
        file: '',
        imagePreviewUrl: ''
    }
    setVarible(event, key) {
        const currentValue = this.state.currentValue;
        currentValue[key] = event.target.value;
        this.setState({ currentValue });
        this.validateForm(currentValue);
        if (this.state.ischecked) {
            currentValue.permanentaddress = "";
            this.setState({
                ischecked: false,
                currentValue
            })
        }

    }

    handleChecked() {
        const currentValue = this.state.currentValue
        this.setState({
            ischecked: true

        })
        setTimeout(() => {
            if (this.state.ischecked) {
                currentValue.permanentaddress = currentValue.communicationaddress
                this.setState({ currentValue })
            }

        }, 0)
    }
    create = (e) => {
        e.preventDefault();
        this.save();

    }
    save = () => {
        const rows = this.state.rows;
        const editRowId = this.state.editId;
        // const formIsValid=this.state.formIsValid;

        if (editRowId === true) {
            rows[this.state.edit] = this.state.currentValue
            this.clear()
        }
        else {
            rows.push({ ...this.state.currentValue, id: rows.length, img: this.state.imagePreviewUrl});
            this.clear()
        }
        this.setState({
            rows,
            tableDisplay: rows.length >0,
            text: "Create",
        });
    }
    validateForm(currentValue){
        let errors = {};

        if (currentValue.fname === ""){
            errors.fname = "*Please enter your firstname.";

        }
        else if (typeof currentValue.fname !== "undefined") {
            if (!currentValue.fname.match(/^[a-zA-Z]+$/)) {
                errors.fname = "*Please enter alphabet characters only.";

            }

        }
        if (currentValue.lname === "") {
            errors.lname = "*Please enter your lastname.";

        }
        else if (typeof currentValue.lname !== "undefined") {
            if (!currentValue.lname.match(/^[a-zA-Z]+$/)) {
                errors.lname = "*Please enter alphabet characters only.";

            }

        }
        if (currentValue.email === "") {
            errors.email = "*Please enter your email-ID.";

        }
        else if (typeof [currentValue.email] !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(currentValue.email)) {
                errors.email = "*Please enter valid email-ID.";

            }
        }
        if (currentValue.gender === "") {
            errors.gender = "*Please fill the gender.";

        }
        if (currentValue.phone === "") {
            errors.phone = "*Please enter your mobile no.";

        }

        else if (typeof [currentValue.phone] !== "undefined") {
            const pattern = new RegExp(/^[0-9]{10}$/);
            if (!pattern.test(currentValue.phone)) {
                errors.phone = "*Please enter valid mobile no.";

            }

        }

        this.setState({
            errors: errors,

        });

    }
    clear = () =>{
        document.getElementsByClassName("employeeForms")[0].reset();
        this.setState({
            currentValue: {
                name: "",
                email: "",
                gender: " ",
                phone: "",
                address: "",
                dob: "",
                communicationaddress: "",
                permanentaddress: "",
                unique: 1,
            },
            ischecked: false,
            imagePreviewUrl:"",
            file:"",
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
    handleEditRow(i) {
        this.setState({
            currentValue: {
                img: this.state.rows[i].img,     
                fname: this.state.rows[i].fname,
                lname: this.state.rows[i].lname,
                id: this.state.rows[i].id,
                gender: this.state.rows[i].gender,
                email: this.state.rows[i].email,
                phone: this.state.rows[i].phone,
                dob: this.state.rows[i].dob,
                communicationaddress: this.state.rows[i].communicationaddress,
                permanentaddress: this.state.rows[i].permanentaddress,

            },
            editId: true,
            text: "Update",
            edit: i,
          
        })
    }
    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} alt="dummy" style={{ width: "100%" }} />);
        } else {
            $imagePreview = (<Sample />);
        }
        return (
            <Router>
            <div className="mainWapper">
                <form className="employeeForms" >
                    <div className="formWapper">
                        <div >
                            <div className="Wapper">
                                <div className="imageUpload">
                                    <div className="imageContainer">
                                        <div className="viewImage">
                                            <div className="imagePreview">{$imagePreview}</div>
                                            <div>{this.state.file.name}</div>
                                        </div>
                                        <div style={{
                                            alignItems: "center", display: "flex", justifyContent: "center"
                                        }}>
                                            <input type="file" ref={this.fileInput} onChange={this.fileChangedHandler} className="inputFile" />
                                            <button className="uploadButton">Upload</button>
                                        </div>
                                    </div>
                                </div>
                                <div >
                                    <label>FirstName<span className="required">*</span></label>
                                    <div>
                                        <input className="inputField" value={this.state.currentValue.fname} onChange={(e) => this.setVarible(e, "fname")} type="text" ></input>
                                        <div className="errorMsg">{this.state.errors.fname}</div>
                                    </div>
                                </div>
                                <div >
                                    <label>LastName<span className="required">*</span></label>
                                    <div>
                                        <input className="inputField" value={this.state.currentValue.lname} onChange={(e) => this.setVarible(e, "lname")} type="text" ></input>
                                        <div className="errorMsg">{this.state.errors.lname}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="wapper2">
                                <div>
                                    <label>DOB <span className="required">*</span></label>
                                    <input className="inputField" value={this.state.currentValue.dob} onChange={(e) => this.setVarible(e, "dob")} type="Date"></input>
                                </div>


                                <div className="radioButton">
                                    <label>Gender <span className="required">*</span></label>
                                    <div>
                                        <span>Male</span>
                                        <input type="radio" value="male" checked={this.state.currentValue.gender === 'male'}
                                            onChange={(e) => this.setVarible(e, "gender")} />
                                        <span>Female</span>
                                        <input type="radio" value="female" checked={this.state.currentValue.gender === 'female'}
                                            onChange={(e) => this.setVarible(e, "gender")} />
                                        <div className="errorMsg">{this.state.errors.gender}</div>
                                    </div>

                                </div>

                                <div >
                                    <label>Email <span className="required">*</span></label>
                                    <div>
                                        <input className="inputField" value={this.state.currentValue.email} onChange={(e) => this.setVarible(e, "email")} type="email"></input>
                                        <div className="errorMsg">{this.state.errors.email}</div>
                                    </div>
                                </div>
                            </div>


                            <div className="wapper3">
                                <div >
                                    <label>Phone <span className="required">*</span></label>
                                    <div>
                                        <input className="inputField" value={this.state.currentValue.phone} onChange={(e) => this.setVarible(e, "phone")} type="number"></input>
                                        <div className="errorMsg">{this.state.errors.phone}</div>
                                    </div>
                                </div>
                                <div >
                                    <label>Communication Address <span className="required">*</span></label><textarea value={this.state.currentValue.communicationaddress} onChange={(e) => this.setVarible(e, "communicationaddress")} type="text"></textarea>
                                    <div className="checkBox"><input type="checkbox" checked={this.state.ischecked} onChange={(e) => this.handleChecked(e)} /><span>Communication address is same as Permanent address</span></div>
                                </div>

                                <div>
                                    <label>Permanent Address <span className="required">*</span></label><textarea value={this.state.currentValue.permanentaddress} onChange={(e) => this.setVarible(e, "permanentaddress")} type="text"></textarea>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className='Button'>
                       <Link to="/list"><button id="button" className="buttonStyle" onClick={(e) => this.create(e)}>{this.state.text}</button></Link> 
                    </div>
                </form>
              
              <Route path="/list"  Component={<Routing rows={this.state.rows}/>} > </Route>
             
             
               
            </div>
            </Router>
        )
    }
}
export default Employeeform;
