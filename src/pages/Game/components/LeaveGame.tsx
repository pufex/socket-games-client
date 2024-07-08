import { useGameHandlers } from "../../../hooks/useGameHandlers"
import { useGame } from "../../../store/store"

import Button from "../../../ui/Button"

const LeaveGame = () => {

    const {LeaveGame} = useGameHandlers()
    const {game} = useGame()

    const handleLeavingGame = () => {
        if(!game)
            return 
        LeaveGame(game.name)
    }

    return <Button
        className="leave-game__btn"
        onClick={handleLeavingGame}
    >
        Leave
    </Button>
}

export default LeaveGame
