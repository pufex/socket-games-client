import {Routes, Route} from "react-router-dom"

import { Navigate } from "react-router-dom"

import MakePrivate from "./auth/MakePrivate"
import MoveOutside from "./auth/MoveOutside"

import PublicOutlet from "./components/PublicOutlet"

import Login from "./auth/Login"
import Register from "./auth/Register"
import Games from "./pages/Games/Games"
import NewGame from "./pages/NewGame/NewGame"
import Game from "./pages/Game/Game"

const App = () => {
  return <Routes>
    <Route element={<MoveOutside />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>} />
    </Route>

    <Route element={<MakePrivate />}>
      <Route path="/" element={<PublicOutlet/>}>
        <Route index element={<Navigate to="/games" replace />} />
        <Route path="games">
          <Route index element={<Games />} />
          <Route path="new-game" element={<NewGame />}/>
          <Route path=":id" element={<Game />}/>
        </Route>
      </Route>
    </Route>
  </Routes>
}

export default App
