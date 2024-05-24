import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { FaPenSquare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function UserComponent() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        try {
            const token = localStorage.getItem("token")
            axios.get("http://localhost:3001/api/admin/",{ headers: {Authorization: `Bearer ${token}`}})
                .then(response => {
                    setUsers(response.data)
            })
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
                        <td>{index+1}</td>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                        <td>{user.phone}</td>
                        <td>{user.active === true ? "Online" : "Offline"} </td>
                        <td><FaPenSquare /><MdDelete /></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default UserComponent;