import type { AskToStartPayload } from "../../../types";

import { useGame } from "../../../store/store"
import { useSocket } from "../../../contexts/Socket"

import Button from "../../../ui/Button";

const ActivateGame = () => {
    
    const {socket} = useSocket();
    const {game} = useGame()

    const handleGameActivation = () => {
        if(!game || !socket)
            return 

        if(!game.X || !game.O)
            return 

        const askToStartPayload: AskToStartPayload = {
            game: game.name
        }
        socket.emit("askToStartGame", askToStartPayload)
    }

    if(game)
    return <div className="activate-game">
        {
            !game.X || !game.O
                ? <p className="activate-game__information"> 
                    All slots must be taken to begin the game
                </p>
                : <p className="activate-game__information"> 
                    Press start to begin the game!
                </p>
        }
        <Button
            isDisabled={!game.X || !game.O}
            onClick={handleGameActivation}
            className="activate-game__button"
        >
            Start
        </Button>
    </div>

    else 
    return null
}

export default ActivateGame
