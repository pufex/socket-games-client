import { useGames } from "../../../store/store"
import { useEffect, useState } from "react"

import LoadingBlock from "../../../components/LoadingBlock"
import GameRecord from "./GameRecord"

import api from "../../../api/api"

const GamesList = () => {
    
    const {games, setGames} = useGames()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true)
            try{
                const result = await api.get("/games")
                setGames(result.data)
            }catch(err){
                console.log(err)
            }
            setLoading(false)
        }

        fetchGames()
    }, [])

    if(loading)
    return <LoadingBlock />

    else
    return !games.length
        ? <div className="games-list--empty">
            {"No games :("}
        </div>
        : <section className="games-list">
            {
                games.map((game) => (
                    <GameRecord game={game}/>
                ))
            }
        </section>
}

export default GamesList
