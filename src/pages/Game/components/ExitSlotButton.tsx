import type { AskToExitSlotPayload } from "../../../types"

import { useSocket } from "../../../contexts/Socket"
import { useGame } from "../../../store/store"
import { useAuth } from "../../../auth/Auth"

import Button from "../../../ui/Button"

type ExitSlotButtonProps = {
    player: "O" | "X"
}

const ExitSlotButton = ({
    player
}: ExitSlotButtonProps) => {
  
    const {socket} = useSocket();
    const {game} = useGame();
    const {auth} = useAuth()

    const askToExitSlot = () => {
        if(!socket || !game || !auth)
            return

        if(game.isActive)
            return

        const payload: AskToExitSlotPayload = {
            game: game.name,
            player
        }
        socket.emit("askToExitSlot", payload)
    }

    if(game)
    return <Button
        role="button"
        className="join-x__button"
        onClick={askToExitSlot}
        isDisabled={game.isActive}
    >
        {
            game.isActive
                ? "Can't"
                : "Leave"
        }
    </Button>
    else return null
}

export default ExitSlotButton
