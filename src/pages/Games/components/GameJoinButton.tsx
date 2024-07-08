import { useGameHandlers } from "../../../hooks/useGameHandlers"

import Button from "../../../ui/Button"

type GameJoinButtonProps = {
    name: string,
}

const GameJoinButton = ({
    name
}: GameJoinButtonProps) => {

    const {JoinGame} = useGameHandlers()

    return <Button
        type="primary"
        role="button"
        onClick={() => JoinGame(name)} 
    >
        Join
    </Button>
}

export default GameJoinButton
