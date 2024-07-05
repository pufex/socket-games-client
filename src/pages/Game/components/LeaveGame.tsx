import { useNavigate } from "react-router-dom"

import Button from "../../../ui/Button"

const LeaveGame = () => {

    const navigate = useNavigate()

    return <Button
        onClick={() => navigate("/games")}
        className="leave-game__btn"
    >
        Leave
    </Button>
}

export default LeaveGame
