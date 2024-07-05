import type { 
    GameEnteredPayload, 
    EnterGamePayload, 
    GameStateChanged,
    LeaveGamePayload
} from "../../types"

import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useGame } from "../../store/store"
import { useSocket } from "../../contexts/Socket"
import { useNavigate, useLocation } from "react-router-dom"

import LoadingBlock from "../../components/LoadingBlock"
import LeaveGame from "./components/LeaveGame"
import GameOverview from "./components/GameOverview"
import GameBoard from "./components/GameBoard"

import { useAuth } from "../../auth/Auth"

const Game = () => {

    const {pathname} = useLocation()
    const {auth, setAuth} = useAuth()
    const navigate = useNavigate()
    const {socket} = useSocket()
    const {game, setGame} = useGame()
    const {id: game_name} = useParams()

    useEffect(() => {
        if(!socket || !auth || !game_name)
            return navigate("/")

        const handleEnterError = () => {
            console.log("An error occured while joining the game.")
            setGame(undefined)
            setAuth(prev => !prev
                ? prev
                : {
                    ...prev, 
                    user: {
                        ...prev.user, 
                        game_name: null
                    }
                }
            )
            navigate("/")
        }

        const handleEnterSuccess = ({game: newGame}: GameEnteredPayload) => {
            console.log("Joined the game!")
            
            const handleGameChange = ({game: updatedGame}: GameStateChanged) => {
                console.log("Changing game state...")
                console.log("Payload")
                console.log(updatedGame)
                setGame(updatedGame)
            }

            console.log(newGame)
            setGame(newGame)
            setAuth(prev => !prev
                ? prev
                : {
                    ...prev,
                    user: {
                        ...prev.user,
                        game_name: newGame.name
                    }
                }
            )
            socket.on("gameStateChange", handleGameChange)
        }

        const entryObject: EnterGamePayload = {
            game: game_name,
            user_id: auth.user.id
        }

        socket.on("enterGameError", handleEnterError)
        socket.on("enterGameSuccess", handleEnterSuccess)
        socket.emit("enterGame", entryObject)
        
        return () => {
            const payload: LeaveGamePayload = {
                game: game_name,
                user_id: auth.user.id
            }
            console.log("Will i leave?")
            console.log(game ? "Yes" : "No")
            console.log(game)
            if(game){
                console.log("leaving game...")
                socket.emit("leaveGame", payload)
            }
            setGame(undefined)
            setAuth(
                prev => !prev 
                    ? prev
                    : {
                        ...prev,
                        user: {
                            ...prev.user,
                            game_name: null
                        }
                    }
            )
            socket.off("enterGameError", handleEnterError)
            socket.off("enterGameSuccess", handleEnterSuccess)
        }
    }, [socket, pathname])

    if(game === undefined)
    return <LoadingBlock />

    else
    return <section className="game__container">
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
