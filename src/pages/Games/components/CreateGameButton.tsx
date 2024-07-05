import { useNavigate } from "react-router-dom"
import Button from "../../../ui/Button"

const CreateGameButton = () => {

    const navigate = useNavigate()

    return <Button
        type="primary"
        role="button"
        onClick={() => navigate("/games/new-game")}
    >
        Create Room
    </Button>
  
}

export default CreateGameButton
