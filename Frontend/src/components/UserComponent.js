import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { FaPenSquare } from "react-icons/fa";

function UserComponent() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        try {
            axios.get("http://localhost:3001/api/admin/")
                .then(response => setUsers(response.data)) 
            console.log(users)   
        }
        catch (err) {
            console.log(err)
        }
    },[])
    return (
        <Table striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>E-mail</th>
                    <th>Username</th>
                    <th>Phone Number</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user,index) => (
                    <tr key={user._id}>
                        <td>index+1</td>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                        <td>{user.phone}</td>
                        <td>{user.active === "true" ? "Online" : "Offline"} </td>
                        <td><FaPenSquare /></td>
                    </tr>
                ))}
            </tbody>        
        </Table>
    );
}

export default UserComponent;