import type { UserType } from "../types"

import { useContext, createContext, useState, useLayoutEffect, useEffect } from "react"

import api from "../api/api"

import LoadingPage from "./LoadingPage"

export type AuthObject = {
    accessToken: string,
    user: UserType
}

export type AuthObjectInContext = AuthObject | undefined | null

export type AuthContextType = {
    auth: AuthObjectInContext,
    setAuth: React.Dispatch<React.SetStateAction<AuthObjectInContext>>
}

const AuthContext = createContext<undefined | AuthContextType>(undefined)

export const useAuth = () => {
    const authContext = useContext(AuthContext)
    if(!authContext) throw new Error("useAuth() cannot be used outside the Auth Provider.")
    return authContext
}

type AuthProviderProps = {
    children: React.ReactNode
}

const AuthProvider = ({
    children
}: AuthProviderProps) => {

    const [auth, setAuth] = useState<AuthObjectInContext>(undefined)

    useEffect(() => {
        const fetchAuth = async () => {
            try{
                const result = await api.get("/auth/refresh")
                const {user, accessToken} = result.data as AuthObject
                setAuth({user, accessToken})
            }catch(err){
                setAuth(null)
            }
        }

        fetchAuth()

    }, [])

    useLayoutEffect(() => {
        const reqInterceptor = api
            .interceptors
            .request
            .use((config) => {
                config.headers.authorization = 
                    // @ts-expect-error
                    !config._retry && auth?.accessToken
                        ? `Bearer ${auth.accessToken}`
                        : config.headers.authorization
                return config
            })  
        return () => {
            api.interceptors.request.eject(reqInterceptor)
        }
    }, [auth])

    useLayoutEffect(() => {
        const responseInterceptor =  api
            .interceptors
            .response
            .use(
                (result) => result,
                async (error) => {
                    const originalRequest = error.config
                    if(
                        error.response.status === 403
                        && originalRequest._retry 
                    ) {
                        try{
                            const response = await api.get("/auth/refresh")
                            setAuth(response.data)
                            
                            originalRequest.headers.authorization = `Bearer ${response.data.accessToken}`
                            originalRequest._retry = true;
        
                            return api(originalRequest)
                        }catch{
                            setAuth(null)
                        }
                    }
    
                    return Promise.reject(error)
                }
            )

            return () => {
                api.interceptors.response.eject(responseInterceptor)
            }
    }, [auth])

    return <AuthContext.Provider value={{auth, setAuth}}>
        {
            auth === undefined
                ? <LoadingPage />
                : children
        }
    </AuthContext.Provider>
}

export default AuthProvider
