import { useGame } from "../../../store/store"

import { cn } from "../../../utils/cn"

export type ConclusionProps = {
    isDraw?: boolean
}

const Conclusion = ({
    isDraw = false
}: ConclusionProps) => {
    
    const {game} = useGame()
    
    if(game && !isDraw)
    return <div className="conclusion">
        <h1 className="heading center">
            Conclusion
        </h1>
        <div className="conclusion__winner">
            <h1 className="conclusion__title">
                The winner is:
            </h1>
            <h2 
                className={cn(
                    "conclusion__player",
                    typeof game.winner === "string"
                        ? game.winner
                        : ""
                )}
            > 
                {game.winner}
            </h2>
        </div>
    </div>
    else if (game && isDraw)
    return <div className="conclusion">
        <h1 className="heading center">
            Draw!
        </h1>
    </div>
    return null
}

export default Conclusion
