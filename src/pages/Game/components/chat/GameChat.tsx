import { useRef } from "react"
import { useGame } from "../../../../store/store"

import ReceivedMessages from "./ReceivedMessages"
import ChatForm from "./ChatForm"
import ChatMessage from "./ChatMessage"

const GameChat = () => {

    const {game} = useGame()
    const chatboxRef = useRef<HTMLDivElement>(null)

    if(game)
    return <div className="game-chat">
        <div 
            className="game-chat__box"
            ref={chatboxRef}
        >
            <ChatMessage isAdmin>
                Welcome to the "{game.name}" game!
            </ChatMessage>
            <ReceivedMessages chatboxRef={chatboxRef} />
        </div>
        <ChatForm chatboxRef={chatboxRef} />
    </div>
    else return null
}

export default GameChat
