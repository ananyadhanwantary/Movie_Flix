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
    const imgPath = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
    return(
        <>
        <br/><br/>
           <Container>
                <img alt ="" src={imgPath} style={{height:"100px"}} className="float-start rounded-circle m-3" />
                <h3>{user.username}</h3>
                <h3>Email:{user.email}</h3>
                <h3>Phone Number:{user.phone}</h3>                
           </Container>
           
        </>
    )
}
export default ProfileComponent;