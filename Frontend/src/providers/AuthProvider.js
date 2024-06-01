import axios from 'axios'
import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const AuthContext = createContext()

const AuthProvider = ({children}) => {
    console.log('AuthProvider children:', children);
    // const [user,setUser] = useState(() => {
    //     const storedUser = localStorage.getItem('user')
    //     return storedUser ? JSON.parse(storedUser) : null
    // })
    const [token,setToken] = useState(() => {
        const storedToken = localStorage.getItem('token')
        return storedToken ? JSON.parse(storedToken) : null
    })
    const [userId,setUserId] = useState(() => {
        const storedUserId = localStorage.getItem('userId')
        return storedUserId ? JSON.parse(storedUserId) : null
    })
    const [role,setRole] = useState(() => {
        const storedRole = localStorage.getItem('role')
        return storedRole ? JSON.parse(storedRole) : null
    })
    const navigate = useNavigate()
    const loginAction  = async (data) => {
        try{
            const response = await axios.post('http://localhost:3001/api/login',data)
            if(response.data){
                console.log(response.data)
                alert(response.data.message)
                // setUser(response.data.user)
                setToken(response.data.token)
                setUserId(response.data.userId)
                setRole(response.data.role)
                // console.log(user,token,userId,role)
                localStorage.setItem('token',JSON.stringify(response.data.token))
                localStorage.setItem('userId',JSON.stringify(response.data.userId))
                localStorage.setItem('role',JSON.stringify(response.data.role))
                if(response.data.role==="admin"){
                    navigate('/admin')
                }
                else if(response.data.role==="user"){
                    navigate('/')
                }
                return
            }
            throw new Error(response.data.message)
        }
        catch(err){
            alert(err)
            navigate("/signup")
            console.error(err)
        }
    }
    const logout = () =>{
        // setUser(null)
        setToken(null)
        setUserId(null)
        setRole(null)
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('userId')
    }
    
    return (
        <AuthContext.Provider value = {{token, role, userId, loginAction, logout}} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}
