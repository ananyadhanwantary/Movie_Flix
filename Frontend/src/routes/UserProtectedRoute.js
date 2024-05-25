import React from "react";
import { Navigate } from "react-router-dom";
function UserProtectedRoute(){
    const {token}=useAuth();
    if(!token) return <Navigate to = "/login"/>
    return <Outlet />
}
export default UserProtectedRoute;