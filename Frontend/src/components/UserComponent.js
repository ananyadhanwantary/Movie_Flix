import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { FaPenSquare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function UserComponent() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    const handleEdit = (id) => {
        navigate(`/editUser/${id}`);
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        const res = await axios.delete(`http://localhost:3001/api/admin/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.status === 200) {
            console.log(res.data);
            setUsers(users.filter(user => user._id !== id));
        } else {
            alert(res.data.message);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3001/api/admin/", { headers: { Authorization: `Bearer ${token}` } });
                setUsers(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUsers();
    }, []);

    return (
        <>
            <div style={{ margin: '20px' }} className='vh-100 p-4'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>E-mail</th>
                            <th>Username</th>
                            <th>Phone Number</th>
                            <th>Status</th>
                            {/* <th>Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.email}</td>
                                <td>{user.username}</td>
                                <td>{user.phone}</td>
                                <td>{user.active ? "Online" : "Offline"}</td>
                                {/* <td >
                                    <div className='d-flex justify-content-center justify-content-around align-items-center '>
                                        <div style={{backgroundColor: "#21eb38"}} className='border border-1 border-dark px-3 py-1 d-flex justify-content-center align-items-center' onClick={() => handleEdit(user._id)}><FaPenSquare/></div>
                                        <div style={{backgroundColor: "#f72525"}} className='border border-1 border-dark px-3 py-1 d-flex justify-content-center align-items-center' onClick={() => handleDelete(user._id)}><MdDelete/></div>
                                    </div>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default UserComponent;
