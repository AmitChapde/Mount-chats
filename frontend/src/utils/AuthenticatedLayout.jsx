import React from "react";
import { Navigate, Outlet,  } from "react-router-dom";


const AuthenticatedLayout=()=>{
    const token=localStorage.getItem('token');

    if(!token){
        return <Navigate to="/" replace/>;
    }
    return <Outlet/>
};


export default AuthenticatedLayout;