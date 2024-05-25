import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
function AdminProtectedRoute(){
    const {role,token}=useAuth();
    if(!token) return <Navigate to = "/login"/>
    if(role!="admin")   return alert("You are not authorized user!!")
    return <Outlet />
}
export default AdminProtectedRoute;