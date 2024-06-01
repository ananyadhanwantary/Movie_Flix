import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useAuth } from "../providers/AuthProvider";
function ProfileComponent(){
    var {userId} = useAuth();
    var [user,setUser] = useState({})
    useEffect(()=>{
        axios.get(`http://localhost:3001/api/user/${userId}`)
        .then(res => setUser(res.data))
        .catch(err => console.log(err))
    },[userId])
    return(
        <>
           <Container>
                <h1>{user.username}</h1>
                <h1>Email:{user.email}</h1>
                <h1>Phone Number:{user.phone}</h1>                
           </Container>
        </>
    )
}
export default ProfileComponent;