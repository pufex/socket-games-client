import CreateGameButton from "./components/CreateGameButton"
import GamesList from "./components/GamesList"

const Games = () => {

  return <>
    <section className="games__options">
      <CreateGameButton />
    </section>  
    <GamesList />
  </>
}

export default Games
