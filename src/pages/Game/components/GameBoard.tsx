import { useGame } from "../../../store/store"

import ActivateGame from "./ActivateGame"
import FieldButton from "./FieldButton"
import Conclusion from "./Conclusion"

const GameBoard = () => {

    const {game} = useGame()

    if(!game)
    return null

    if(!game.isActive)
    return <ActivateGame />

    if(!game.isFinished)
    return <div className="game-board">
        {
            game.board.map((row, i) => {
                return row.flatMap((cell, j) => {
                    return <FieldButton 
                        value={cell}
                        row={i}
                        col={j}
                    />
                })
            })
        }
    </div>

    if(game.isDraw)
    return <Conclusion isDraw={game.isDraw} />

    if(game.isFinished)
    return <Conclusion />

}

export default GameBoard
