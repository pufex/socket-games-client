import {Outlet, Navigate} from "react-router-dom"
import { useLocation } from "react-router-dom"
import { useAuth } from "./Auth"

const MakePrivate = () => {
    
    const {pathname} = useLocation()
    const {auth} = useAuth()
    
    return !auth 
        ? <Navigate to="/login" replace state={{previous: pathname}}/>
        : <Outlet />
}

export default MakePrivate
