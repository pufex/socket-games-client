import { useGame } from "../../store/store"

import { Navigate } from "react-router-dom"
import LoadingBlock from "../../components/LoadingBlock"
import LeaveGame from "./components/LeaveGame"
import GameOverview from "./components/GameOverview"
import GameBoard from "./components/GameBoard"


const Game = () => {

    const {game, loadingGame} = useGame()

    if(loadingGame)
    return <LoadingBlock />

    else if(game === undefined)
        return <Navigate to="/games" replace/>

    else return <section className="game__container">
        <LeaveGame />
        <div className="game-table">
            <div className="game-board__container">
                <GameBoard />
            </div>
            <GameOverview />
        </div>
    </section>
    
}

export default Game
