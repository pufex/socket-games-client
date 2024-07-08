import type { GiveTheListPayload } from "../../../types"

import { useEffect, useState } from "react"
import { useSocket } from "../../../contexts/Socket"
import { useGame } from "../../../store/store"

import { Fields, Field } from "../../../ui/Fields"

const GameInfo = () => {
    
    const [users, setUsers] = useState<string[]>([])
    const {game} = useGame()
    const {socket} = useSocket();
    
    useEffect(() => {
        if(!socket || !game) return

        const handleUserList = (payload: GiveTheListPayload) => {
            setUsers(payload.users)
        }

        socket.on("giveTheList", handleUserList)
        socket.emit("askForList", {game: game.name})

        return () => {
            socket.off("giveTheList", handleUserList)
        }
    }, [])


    if(game)
    return <div className="game-info__container">
        <Fields>
            <Field
                name="Name:"
                value={game.name}
            />
            <Field
                name="In game:"
                value={game.isActive ? "Yes" : "No"}
            />
            <Field
                name="Resolved:"
                value={game.isFinished ? "Yes" : "No"}
            />
            <Field
                name="Players:"
                value={
                    !users.length
                        ? "Loading..."
                        : users.join(", ")
                }
            />
        </Fields>
    </div>
    
    else return null
}

export default GameInfo
