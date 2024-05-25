import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { FaPenSquare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function UserComponent() {
    const navigate=useNavigate()
    const [users, setUsers] = useState([])
    const handleEdit=(user)=>{
        navigate(`/editUser/${user._id}`)
    }
    const handleDelete=async(id)=>{
        const token = localStorage.getItem("token")
        const res=await axios.delete(`http://localhost:3001/api/admin/delete/${id}`,{ headers: {Authorization: `Bearer ${token}`}})
            if (res.status === 200) {
                alert(res.data.message)
            } else {
                alert(res.data.message)
            }
    }
    useEffect(() => {
        try {
            const token = localStorage.getItem("token")
            // console.log(token)
            axios.get("http://localhost:3001/api/admin/",{ headers: {Authorization: `Bearer ${token}`}})
                .then(response => {
                    console.log(response.data)
                    setUsers(response.data)
                    // console.log(users)
            })
        }
        catch (err) {
            console.log(err)
        }
    })
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
                    <tr>
                        <td>{index+1}</td>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                        <td>{user.phone}</td>
                        <td>{user.active === true ? "Online" : "Offline"} </td>
                        <td><FaPenSquare onClick={()=>{handleEdit(user)}}/>
                        <MdDelete onClick={()=>handleDelete(user._id)}/></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default UserComponent;