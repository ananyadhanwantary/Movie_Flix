import {useContext, createContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [token,setToken] = useState(null)
    const [userId,setUserId] = useState(null)
    const [role,setRole] = useState(null)
    const navigate = useNavigate()
    const loginAction  = async (data) => {
        try{
            const response = await axios.post('http://localhost:3001/api/login',data)
            if(response.data){
                setUser(response.data.user)
                setToken(response.data.token)
                setUserId(response.data.userId)
                setRole(response.data.role)
                localStorage.setItem('token',JSON.stringify(response.data.token))
                localStorage.setItem('role',JSON.stringify(response.data.role))
                return 
            }
            throw new Error(response.message)
        }
        catch(err){
            navigate("/signup")
            console.error(err)
        }
    }
    const logout = () =>{
        setUser(null)
        setToken(null)
        setUserId(null)
        setRole(null)
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    return (
        <AuthContext.Provider value = {{user,token, role, userId, loginAction, logout}} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}