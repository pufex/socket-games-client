import {Outlet, Navigate} from "react-router-dom"
import { useAuth } from "./Auth"

const MoveOutside = () => {
    
    const {auth} = useAuth()
    
    return auth 
        ? <Navigate to="/" replace/>
        : <Outlet />
}

export default MoveOutside
