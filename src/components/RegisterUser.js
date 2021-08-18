import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import GlobalUserList from "./context/GlobalUserList";
import { Link } from 'react-router-dom'

function RegisterUser() {
    const [newUser, updateNewUser] = useState({})
    const [errorInfo, updateErrorInfo] = useState({})
    const [isRegisterSuccess, setRegisterSuccess] = useState(false)

    const nameRef = useRef()
    const emailRef = useRef()
    let errorFlag = false;


    const validateFields = (field, value) => {
        if (field == "userName") {
            if (value.match(/^[a-zA-Z]+$/)) {
                delete errorInfo.nameError;
                return true;
            }
            else {
                errorFlag = true;
                updateErrorInfo(
                    {
                        ...errorInfo,
                        nameError: "Inavlid username."
                    }
                )
                return false;
            }
        }
        else if (field == "userEmail") {
            let lastAtPos = value.lastIndexOf('@');
            let lastDotPos = value.lastIndexOf('.');
            if ((lastAtPos < lastDotPos && lastAtPos > 0 && value.indexOf('@@') == -1 && lastDotPos > 2 && (value.length - lastDotPos) > 2)) {
                delete errorInfo.emailError;
                return true
            }
            else {
                errorFlag = true;
                updateErrorInfo(
                    {
                        ...errorInfo,
                        emailError: "Invalid email."
                    }
                )
                return false;
            }
        }
        else if (field == "userContact") {
            if (value.match(/^\d{10}$/)) {
                delete errorInfo.contactError;
                return true;
            }
            else {
                errorFlag = true;
                updateErrorInfo(
                    {
                        ...errorInfo,
                        contactError: "Invalid contact."
                    }
                )
                return false;
            }
        }
        else if (field == "userPassword") {
            if (value.length >= 4) {
                delete errorInfo.passwordError;
                return true;
            }
            else {
                errorFlag = true;
                updateErrorInfo(
                    {
                        ...errorInfo,
                        passwordError: "Add minimum 4 charaters."
                    }
                )
                return false;
            }
        }
        else {
            return true
        }
    }
    const handleUser = (e) => {
        const field = e.target.id;
        const value = e.target.value;

        updateNewUser(
            () => {
                return {
                    ...newUser,
                    [field]: value
                }
            }
        )
        console.log("new user is", newUser)
    }
    const submitHandler = async () => {
        updateErrorInfo({})
        const fieldSet = ["userName", "userEmail", "userContact", "gender", "userPassword"]

        for (var i = 0; i < fieldSet.length; i++) {
            if (newUser.hasOwnProperty(fieldSet[i])) {
                let value = newUser[fieldSet[i]];
                validateFields(fieldSet[i], value)
            }
            else {
                errorFlag = true;
                updateErrorInfo(
                    {
                        ...errorInfo,
                        commonError: "All fields are mandatory."
                    }
                )
            }
        }
        if (errorFlag) {
            console.log("Error is:", errorInfo)
        }
        else {
            try {
                await axios.post("http://localhost:3000/users", newUser)
                setRegisterSuccess(true)
            }
            catch (error) {
                console.log("Error occured:", error)
            }
        }
    }

    return (
        <div className='section'>
            {
                isRegisterSuccess ?
                    <div className='register-success'>
                        <h2>User registered successfully</h2>
                        <div>
                            <Link to='/login'>
                                <button className='login-btn'>Login</button>
                            </Link>
                            <Link to='/'>
                                <button className='home-btn'>Home</button>
                            </Link>
                        </div>
                    </div> :
                    <div className="form-wrapper">
                        <h2>Register User</h2>
                        <div className="inner-wrapper">
                            {
                                'commonError' in errorInfo ?
                                    <div className='error'>
                                        <p>{errorInfo["commonError"]}</p>
                                    </div>
                                    : ''
                            }
                            <div className='form-field'>
                                <label className="form-label">Name</label>
                                <div className='input-group'>
                                    <input type="text" id="userName" ref={nameRef} onChange={
                                        (e) => {
                                            handleUser(e)
                                        }
                                    } />
                                    {
                                        'nameError' in errorInfo ?
                                            <div className='error'>
                                                <p>{errorInfo["nameError"]}</p>
                                            </div> : ''
                                    }
                                </div>
                            </div>
                            <div className='form-field'>
                                <label className="form-label">Email</label>
                                <div className='input-group'>
                                    <input type="text" id="userEmail" ref={emailRef} onChange={
                                        (e) => {
                                            handleUser(e)
                                        }
                                    } />
                                    {
                                        'emailError' in errorInfo ?
                                            <div className='error'>
                                                <p>{errorInfo["emailError"]}</p>
                                            </div>
                                            : ''
                                    }
                                </div>
                            </div>
                            <div className='form-field'>
                                <label className="form-label">Contact Number</label>
                                <div className='input-group'>
                                    <input type="text" id="userContact" onChange={
                                        (e) => {
                                            handleUser(e)
                                        }
                                    } />
                                    {
                                        'contactError' in errorInfo ?
                                            <div className='error'>
                                                <p>{errorInfo["contactError"]}</p>
                                            </div>
                                            : ''
                                    }
                                </div>
                            </div>
                            <div className='form-field'>
                                <label className="form-label">Gender</label>
                                <div className='input-group  radio-wrapper'>
                                    <div className='radio-unit'>
                                        <span>Male</span>
                                        <input type="radio" id='gender' name="gender" value="male" onChange={
                                            (e) => {
                                                handleUser(e)
                                            }
                                        } />
                                    </div>
                                    <div className='radio-unit'>
                                        <span>Female</span>
                                        <input type="radio" id='gender' name="gender" value="female" onChange={
                                            (e) => {
                                                handleUser(e)
                                            }
                                        } />
                                    </div>
                                </div>
                            </div>
                            <div className='form-field'>
                                <label className="form-label">Password</label>
                                <div className='input-group'>
                                    <input type="text" id="userPassword" onChange={
                                        (e) => {
                                            handleUser(e)
                                        }
                                    } />
                                    {
                                        'passwordError' in errorInfo ?
                                            <div className='error'>
                                                <p>{errorInfo["passwordError"]}</p>
                                            </div>
                                            : ''
                                    }
                                </div>
                            </div>
                            <button className='submit-btn' onClick={() => submitHandler()}>Submit</button>
                        </div>
                    </div>
            }
        </div>
    )
}
export default RegisterUser