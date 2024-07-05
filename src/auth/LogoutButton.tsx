import { useState } from "react"
import { useAuth } from "./Auth"

import Button from "../ui/Button"

import api from "../api/api"

const LogoutButton = () => {

    const {setAuth} = useAuth()
    const [loading, setLoading] = useState(false)

    const handleLogout = async () => {
        setLoading(true)
        try{
            await api.get("/auth/logout")
            setAuth(null)
        }catch(err){
            console.log(err)
        }
        setLoading(false)
    }

    return <Button
        role="button"
        type="raw"
        onClick={handleLogout}
        isLoading={loading}
        isDisabled={loading}
    >
        Logout
    </Button>
}

export default LogoutButton
