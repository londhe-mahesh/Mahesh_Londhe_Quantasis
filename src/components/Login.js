import axios from 'axios';
import React, { useState, useRef } from 'react'
import {Link} from 'react-router-dom'

function Login() {
    const [user, updateUser] = useState({});
    const [isLoginSuccess, setLoginSuccess] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState({})
    const [isError, setIsError] = useState(false);

    const emailRef = useRef()
    const passwordRef = useRef()

    const handleUser = (e) => {
        let field = e.target.id;
        let value = e.target.value;
        updateUser({
            ...user,
            [field]: value
        })
        console.log("User inputs", user)
    }
    const submitHandler = async () => {
        try {
            const resp = await axios.get(`http://localhost:3000/users?userEmail=${user.userEmail}&userPassword=${user.userPassword}`)
            console.log("api resp is:", resp);
            if (resp.data.length != 0) {
                setLoginSuccess(true)
                setLoggedInUser(resp.data[0])
            }
            else {
                setLoginSuccess(false)
                setIsError(true);
            }
        }
        catch (error) {
            console.log("Error occured:", error);
        }

    }
    return (
        <div className='section'>
            {
                isLoginSuccess ?
                        <div className='register-success'>
                            <h2>Welcome {loggedInUser.userName}</h2>
                            <div className='user-details'>
                                <h4>User Details</h4>
                                <p>User Name: {loggedInUser.userName}</p>
                                <p>User Email: {loggedInUser.userEmail}</p>
                                <p>User Contact: {loggedInUser.userContact}</p>
                                <p>User Name: {loggedInUser.gender}</p>
                            </div>
                            <Link to='/'>
                                <button className='login-btn'>Home</button>
                            </Link>
                        </div>:
                    <div className="form-wrapper">
                        <h2>Login</h2>
                        <div className="inner-wrapper">
                            <div className='form-field'>
                                <label className="form-label">Email</label>
                                <div className='input-group'>
                                    <input type="text" id="userEmail" ref={emailRef} onChange={
                                        (e) => {
                                            handleUser(e)
                                        }
                                    } />
                                </div>
                            </div>

                            <div className='form-field'>
                                <label className="form-label">Password</label>
                                <div className='input-group'>
                                    <input type="text" id="userPassword" ref={passwordRef} onChange={
                                        (e) => {
                                            handleUser(e)
                                        }
                                    } />
                                    {
                                        isError ?
                                            <div className='error'>
                                                <p>Invalid email or password</p>
                                            </div> : ''

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
export default Login