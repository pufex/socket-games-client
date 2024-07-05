import { FaGamepad as Joystick} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const Logo = () => {

    const navigate = useNavigate()

    return <div 
        className="logo__wrapper"
        onClick={() => navigate("")}
    >
        <Joystick 
            className="logo__icon"
            size={40}
        />
        <h1 className="logo__site-title">
            Socket Games
        </h1>
    </div>
}

export default Logo
