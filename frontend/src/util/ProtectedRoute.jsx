
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute() {
    const isLogged = localStorage.getItem('token');
    return isLogged ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute;