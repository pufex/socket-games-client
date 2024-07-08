import { Outlet } from "react-router-dom"
import Nav from "./Nav"

const OutsideLayout = () => {
  return <>
    <Nav />
    <main className="App">
        <Outlet />
    </main>
  </>
}

export default OutsideLayout
