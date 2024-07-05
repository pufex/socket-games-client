import GameInfo from "./GameInfo"
import GameState from "./GameState"

const GameOverview = () => {
    return <div className="game-overview"> 
        <GameInfo />
        <GameState />
    </div>
}

export default GameOverview
