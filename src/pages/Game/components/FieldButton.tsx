import type { UsurpationPayload } from "../../../types"
import type { RPSFieldType } from "../../../types"

import { useAuth } from "../../../auth/Auth"
import { useGame } from "../../../store/store"
import { useSocket } from "../../../contexts/Socket"

import { cn } from "../../../utils/cn"

export type FieldButtonType = {
    value: RPSFieldType
    row: number,
    col: number,
}

const FieldButton = ({
    value,
    row,
    col
}: FieldButtonType) => {

    const {game} = useGame()
    const {socket} = useSocket()
    const {auth} = useAuth()

    const isEnemyTurn = !game || !auth
        ? true
        : game[game.currentTurn] === auth.user.name
            ? false
            : true

    const handleUserChoice = () => {
        if(!socket || !game)
            return 
        if(isEnemyTurn)
            return


        const usurpationPayload: UsurpationPayload = 
            {game: game.name, row, col,}
        socket.emit("askToTakePosition", usurpationPayload)
    }


    return <button
        className={cn(
            "field-button",
            typeof value === "string"
                ? value
                : ""
        )}
        disabled={isEnemyTurn}
        onClick={handleUserChoice}
    >
        {value}
    </button>
}

export default FieldButton
