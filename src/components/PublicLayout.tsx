import { Outlet } from "react-router-dom"

import SocketProvider from "../contexts/Socket"

const PublicLayout = () => {
    return <SocketProvider>
        <Outlet />
    </SocketProvider>
}

export default PublicLayout
