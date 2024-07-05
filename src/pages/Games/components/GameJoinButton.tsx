import Button from "../../../ui/Button"

import { useNavigate } from "react-router-dom"

type GameJoinButtonProps = {
    name: string,
}

const GameJoinButton = ({
    name
}: GameJoinButtonProps) => {

    const navigate = useNavigate();
    
    return <Button
        type="primary"
        role="button"
        onClick={() => navigate(`/games/${name}`)} 
    >
        Join
    </Button>
}

export default GameJoinButton
