import type { GameType } from "../../../types"

import GameJoinButton from "./GameJoinButton"
import { FaTrophy as Throphy } from "react-icons/fa";
import { FaGrimace as Grim } from "react-icons/fa";

import { cn } from "../../../utils/cn"

type GameRecordProps = {
    game: GameType
}

const GameRecord = ({
    game
}: GameRecordProps) => {
    return <div className="game-record__container">
        <div className="game-record__isActive-wrapper">
            <div 
                className={cn(
                    "game-record__isActive",
                    game.isActive ? "active" : ""
                )}
            />
        </div>
        <div className="game-record__information">
            <h1 className="game-record__name">
                {game.name}
            </h1>
            {
                game.isFinished
                    ? !game.isDraw
                        ? <Throphy className="trophy" size={30} />
                        : <Grim className="grim" size={35} />
                    : null
            }
        </div>
        <div className="game-record__join-wrapper">
            <GameJoinButton name={game.name} />
        </div>
    </div>
}

export default GameRecord
