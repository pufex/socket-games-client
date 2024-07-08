import GameInfo from "./GameInfo"
import GameState from "./GameState"
import GameChat from "./chat/GameChat"

const GameOverview = () => {
    return <div className="game-overview"> 
        <GameInfo />
        <GameState />
        <GameChat />
    </div>
}

export default GameOverview
