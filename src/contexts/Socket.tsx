import type { Socket } from "socket.io-client"

import { useLocation } from "react-router-dom"
import { useAuth } from "../auth/Auth"
import { useState, createContext, useContext, useLayoutEffect, useEffect } from "react"
import { useGame } from "../store/store"

import LoadingBlock from "../components/LoadingBlock"

import {io} from "socket.io-client"

export type SocketContextType = {
  socket: Socket<any,any> | null | undefined,
  setSocket: React.Dispatch<React.SetStateAction<Socket<any, any> | null | undefined>> 
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export const useSocket = () => {
  const socketContext = useContext(SocketContext)
  if(!socketContext) throw new Error("useSocket() cannot be used outside its provider.")
  return socketContext
}

type SocketProviderProps = {
  children: React.ReactNode
}

const SocketProvider = ({
  children
}: SocketProviderProps) => {

  const {pathname} = useLocation();
  const {auth, setAuth} = useAuth()
  const {setGame} = useGame()
  const [socket, setSocket] = useState<Socket<any,any> | undefined | null>(undefined)

  useLayoutEffect(() => {
    const s = io("http://localhost:9000", {
      extraHeaders: auth?.accessToken
        ? {
          authorization: `bearer ${auth.accessToken}` 
        }
        : undefined
    })
    setSocket(s)
    console.log("Connected to the socket!")
    return () => {
      s.disconnect()
    }
  }, [])

  useEffect(() => {
    if(!socket)
      return 

    const handleLeftGame = () => {
      setGame(undefined)
      setAuth(prev => !prev
        ? prev
        : {
          ...prev
        }
      )
    }

    socket.on("leftGame", handleLeftGame)
    return () => {
      socket.off("leftGame", handleLeftGame)
    }
  }, [socket])

  return <SocketContext.Provider value={{socket, setSocket}}>
    {
      socket === undefined
        ? <LoadingBlock height="400px" />
        : children
    }
  </SocketContext.Provider>
}

export default SocketProvider
