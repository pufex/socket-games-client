import { Outlet } from "react-router-dom"
import Nav from "./Nav"

import SocketProvider from "../contexts/Socket"

const PublicOutlet = () => {
    return <>
        <Nav />
        <main className="App">
            <SocketProvider>
                <Outlet />
            </SocketProvider>
        </main>
    </>
}

export default PublicOutlet
