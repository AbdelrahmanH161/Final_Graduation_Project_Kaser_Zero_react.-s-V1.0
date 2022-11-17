import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router";
import swal from 'sweetalert';

const RequireAuth = () => {
    const user = JSON.parse(localStorage.getItem("authorization"))
    const location = useLocation();

    useEffect(()=>{
        if(!user)
        swal("Please Sign in or Sign Up to continue!")
    },[])

    return (
        user ? <Outlet /> : <Navigate to='/home' state={{ from: location }} replace />
    )
}

export default RequireAuth;