import type { AskForSlotPayload } from "../../../types";

import { useAuth } from "../../../auth/Auth";
import { useSocket } from "../../../contexts/Socket"
import { useGame } from "../../../store/store";

import Button from "../../../ui/Button";
import ExitSlotButton from "./ExitSlotButton";

import { cn } from "../../../utils/cn";

type JoinXProps = {
    player: "X" | "O",
}

const JoinSlot = ({
    player
}: JoinXProps) => {
    const {game} = useGame()
    const {socket} = useSocket();
    const {auth} = useAuth();

    const handleXJoin = () => {
        if(!socket || !game)
            return 

        if(game[player]) return

        const askForSlotObj: AskForSlotPayload = {
            game: game.name,
            player: player,
        }

        socket.emit("askForSlot", askForSlotObj)
    }

    if(game && auth)
    return <div className="join-x__container">
        <div 
            className={cn(
                "join-x__player-title",
                player
            )}
        >
            {player}
        </div>
        <div className={"join-x__player"}>
        {
            game[player]
                ? game[player]
                : "Empty"
        }
        </div>
        {
            game[player] === null && game[player === "O" ? "X" : "O"] !== auth.user.name && !game.isFinished && !game.isActive
                ?  <Button
                    role="button"
                    onClick={handleXJoin}
                    className="join-x__button"
                >
                    Join
                </Button>
                : game[player] === auth.user.name
                    ? <ExitSlotButton 
                        player={player}
                    />
                    : <Button
                        role="button"
                        isDisabled={true}
                        className="join-x__button"
                    >
                        Unavail.
                    </Button>
        }
    </div>

    else null
}

export default JoinSlot
