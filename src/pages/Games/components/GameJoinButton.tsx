import { useSocket } from "../../../contexts/Socket"

import Button from "../../../ui/Button"

type GameJoinButtonProps = {
    name: string,
}

const GameJoinButton = ({
    name
}: GameJoinButtonProps) => {

    const {JoinGame} = useSocket()

    return <Button
        type="primary"
        role="button"
        onClick={() => JoinGame(name)} 
    >
        Join
    </Button>
}

export default GameJoinButton
