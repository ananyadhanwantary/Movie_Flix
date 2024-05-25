import React from "react";
import { Navigate,Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
function UserProtectedRoute(){
    const {token}=useAuth();
    if(!token) return <Navigate to = "/login"/>
    return <Outlet />
}
export default UserProtectedRoute;