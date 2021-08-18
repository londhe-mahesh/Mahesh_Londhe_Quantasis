import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GlobalUserList from './context/GlobalUserList'
import DataTable from 'react-data-table-component';
import axios from 'axios';

function UserList() {
    const [usersList, updateUsersList] = useState([]);
    const nameStyle = {
        "font-size": "20px",
        "font-weight": "600"
    }
    const cellStyle = {
        "font-size": "18px"
    }
    const columns = [
        {
            name: 'Name',
            selector: 'userName',
            cell: row => <div style={nameStyle}>{row.userName}</div>
        },
        {
            name: 'Email id',
            selector: 'userEmail',
            cell: row => <div style={cellStyle}>{row.userEmail}</div>
        },
        {
            name: 'Contact No',
            selector: 'userContact',
            cell: row => <div style={cellStyle}>{row.userContact}</div>
        },
        {
            name: 'Gender',
            selector: 'gender',
            cell: row => <div style={cellStyle}>{row.gender}</div>
        }
    ];

    useEffect(() => {
        axios.get("http://localhost:3000/users")
            .then((resp) => {
                console.log("server response for users", resp.data)
                updateUsersList(resp.data)
                console.log("user list updated", usersList)
            })
    }, [])
    return (
        <React.Fragment>
            <div className='top-section'>
                <h2>DashBoard</h2>
                <div>
                    <Link to='/register'>
                        <button className='register-btn'>Register</button>
                    </Link>
                    <Link to='/login'>
                        <button className='login-btn'>Login</button>
                    </Link>
                </div>
            </div>
            <div>
                {
                    usersList.length != 0 ?
                        <DataTable title="Users List" className="users-datatable" columns={columns} data={usersList} /> :
                        <h2>No users found.</h2>
                }
            </div>
        </React.Fragment>
    )
}
export default UserList