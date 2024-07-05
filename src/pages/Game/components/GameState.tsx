import JoinSlot from "./JoinSlot"

const GameState = () => {

    return <div className="game-state">
        <div className="game-state__slots">
            <JoinSlot player="O" />
            <JoinSlot player="X" />
        </div>
    </div>
}

export default GameState
