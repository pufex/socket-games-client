import type { Socket } from "socket.io-client"
import type { GameEnteredPayload, GameStateChanged, EnterGamePayload } from "../types"

import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../auth/Auth"
import { useState, createContext, useContext, useLayoutEffect } from "react"
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

  const navigate = useNavigate()

  const {pathname} = useLocation();
  const {auth, setAuth} = useAuth()
  const {game, setGame, setLoadingGame} = useGame()
  const [socket, setSocket] = useState<Socket<any,any> | undefined | null>(undefined)

  useLayoutEffect(() => {
    const s = io("http://localhost:9000")
    setSocket(s)
    return () => {
      s.disconnect()
    }
  }, [])
  
  useLayoutEffect(() => {
    if(!socket || !auth)
      return navigate("/")
    
    const {user: {game_name}} = auth

    const handleGameChange = ({game: updatedGame}: GameStateChanged) => {
      setGame(updatedGame)
    }

    const handleEnterError = () => {
      console.log("enterError event triggered...")

      setGame(undefined)
      setAuth(prev => !prev
          ? prev
          : {
              ...prev, 
              user: {
                  ...prev.user, 
                  game_name: null
              }
          }
      )
      navigate("/games")
      setLoadingGame(false)
    } 
    
    const handleEnterSuccess = ({game: newGame}: GameEnteredPayload) => {            
      console.log("enterSuccess event triggered...")
      
      setGame(newGame)
      setAuth(prev => !prev
          ? prev
          : {
              ...prev,
              user: {
                  ...prev.user,
                  game_name: newGame.name
              }
          }
      )
      socket.on("gameStateChange", handleGameChange)
      navigate(`/games/${newGame.name}`)
      setLoadingGame(false)
    }
      
    socket.on("enterGameSuccess", handleEnterSuccess)
    socket.on("enterGameError", handleEnterError)
    
    const handleLeaveError = () => {
      console.log("leaveError event triggered...")
      if(game_name){
        setLoadingGame(true)
        const entryObject: EnterGamePayload = {
          game: game_name,
          user_id: auth.user.id
        }
        socket.emit("enterGame", entryObject)
      }else navigate("/games")
      setLoadingGame(false)
    }

    const handleLeaveSuccess = () => {
      console.log("leaveSuccess event triggered...")
      setGame(undefined)
      setAuth(prev => !prev
        ? prev
        : {
          ...prev,
          user: {
            ...prev.user,
            game_name: null
          }
        }
      )
      socket.off("gameStateChange", handleGameChange)
      navigate("/games")
      setLoadingGame(false)
    }

    socket.on("gameLeftSuccess", handleLeaveSuccess)
    socket.on("gameLeftError", handleLeaveError)
    
    return () => {
      setGame(undefined)
      setAuth(
          prev => !prev 
              ? prev
              : {
                  ...prev,
                  user: {
                      ...prev.user,
                      game_name: null
                  }
              }
      )
      socket.off("enterGameError", handleEnterError)
      socket.off("enterGameSuccess", handleEnterSuccess)
      socket.off("gameLeftSuccess", handleLeaveSuccess)
      socket.off("gameLeftError", handleLeaveError)    
    }
  }, [socket])

  useLayoutEffect(() => {
    
    if(!socket || !auth)
      return

    const {user: {game_name}} = auth

    if(game_name && !game){
      setLoadingGame(true)
      const entryObject: EnterGamePayload = {
        game: game_name,
        user_id: auth.user.id
      }
      socket.emit("enterGame", entryObject)
    }
  }, [socket, pathname])


  return <SocketContext.Provider value={{socket, setSocket}}>
    {
      socket === undefined
        ? <LoadingBlock height="400px" />
        : children
    }
  </SocketContext.Provider>
}

export default SocketProvider
