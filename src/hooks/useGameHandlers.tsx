import type { EnterGamePayload, LeaveGamePayload } from "../types";

import { useSocket } from "../contexts/Socket";
import { useAuth } from "../auth/Auth";

import { useCallback } from "react";

export const useGameHandlers = () => {

    const {auth} = useAuth()
    const {socket} = useSocket()

    const JoinGame = useCallback((game: string) => {
        if(!socket || !auth)
            return

        const {user: {id: user_id}} = auth
        const payload: EnterGamePayload = {game, user_id}
        socket.emit("enterGame", payload)
    }, [socket, auth])
    
    const LeaveGame = useCallback((game: string) => {
        if(!socket || !auth)
            return
        const {user: {id: user_id}} = auth
        const payload: LeaveGamePayload = {game, user_id}
        socket.emit("askToLeaveGame", payload)
    }, [socket, auth])

    return {JoinGame, LeaveGame}
}


