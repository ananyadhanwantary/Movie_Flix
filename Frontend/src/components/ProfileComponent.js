// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Container } from "react-bootstrap";
// import { useAuth } from "../providers/AuthProvider";
// function ProfileComponent(){
//     var {userId} = useAuth();
//     var [user,setUser] = useState({})
//     useEffect(()=>{
//         axios.get(`http://localhost:3001/api/user/${userId}`)
//         .then(res => setUser(res.data))
//         .catch(err => console.log(err))
//     },[userId])
//     // const imgPath = "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
//     return(
//         <>
//         <br/><br/>
//            <Container className="vh-100">
//                 {/* <img src={imgPath} className="float-start rounded-circle " /> */}
//                 <h1>{user.username}</h1>
//                 <h1>Email:{user.email}</h1>
//                 <h1>Phone Number:{user.phone}</h1>                
//            </Container>
//            <br/><br/><br/>
//         </>
//     )
// }
// export default ProfileComponent;

import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import { useAuth } from "../providers/AuthProvider";
import { IoPersonSharp } from "react-icons/io5";

function ProfileComponent() {
    const { userId } = useAuth();
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/api/user/${userId}`)
            .then(res => setUser(res.data))
            .catch(err => console.log(err));
    }, [userId]);

    return (
        <>
            <br /><br />
            <Container className="vh-100 d-flex flex-column align-items-center justify-content-center">
                <IoPersonSharp size={200} className="mb-3" />
                <Card className="m-4" style={{ maxWidth: '500px' }}>
                    {/* <Card.Img variant="top" src={imgPath} className="rounded-circle" /> */}
                    <Card.Body>
                        <Card.Title>{user.username}</Card.Title>
                        <Card.Text>
                            <strong>Email:</strong> {user.email}
                            <br />
                            <strong>Phone Number:</strong> {user.phone}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
            <br /><br /><br />
        </>
    );
}

export default ProfileComponent;
