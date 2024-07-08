import type { Socket } from "socket.io-client"
import type { 
  GameEnteredPayload, 
  GameStateChanged, 
  EnterGamePayload,
  LeaveGamePayload
} from "../types"

import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../auth/Auth"
import { useState, createContext, useContext, useLayoutEffect, useCallback } from "react"
import { useGame } from "../store/store"

import LoadingBlock from "../components/LoadingBlock"

import {io} from "socket.io-client"

export type SocketContextType = {
  socket: Socket<any,any> | null | undefined,
  setSocket: React.Dispatch<React.SetStateAction<Socket<any, any> | null | undefined>>,
  JoinGame: (game_name: string) => void,
  LeaveGame: (game_name: string) => void,
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

  const JoinGame = useCallback((game: string) => {
    if(!socket)
        return
    setLoadingGame(true)
    const payload: EnterGamePayload = {game}
    socket.emit("enterGame", payload)
  }, [socket])

  const LeaveGame = useCallback((game: string) => {
      if(!socket)
          return
      setLoadingGame(true)
      const payload: LeaveGamePayload = {game}
      socket.emit("askToLeaveGame", payload)
  }, [socket])

  useLayoutEffect(() => {
    if(!auth)
      return
    const s = io("http://localhost:9000", {
      auth: {
        token: auth.accessToken
      }
    })
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
      if(game_name){
        JoinGame(game_name)
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
      JoinGame(game_name)
    }
  }, [socket, pathname])

  return <SocketContext.Provider value={{socket, setSocket, JoinGame, LeaveGame}}>
    {
      socket === undefined
        ? <LoadingBlock height="400px" />
        : children
    }
  </SocketContext.Provider>
}

export default SocketProvider
