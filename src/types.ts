export type UserType = {
    id: string,
    name: string,
    game_name: string | null,
}

export type RPSFieldType = "X" | "O" | null

export type GameType = {
    id: string,
    name: string,
    board: [
        [RPSFieldType,RPSFieldType,RPSFieldType],
        [RPSFieldType,RPSFieldType,RPSFieldType],
        [RPSFieldType,RPSFieldType,RPSFieldType]
    ],
    turn: 0,
    currentTurn: "X" | "O"
    X: null | string,
    O: null | string,
    isActive: boolean,
    isFinished: boolean,
    isDraw: boolean,
    winner: null | string,
}

export type EnterGamePayload = {
    game: string,
    user_id: string,
}

export type LeaveGamePayload = EnterGamePayload

export type GameEnteredPayload = {
    game: GameType
}

export type GameStateChanged = GameEnteredPayload

export type GiveTheListPayload = {
    users: string[]
}

export type AskForSlotPayload = {
    game: string,
    player: "X" | "O",
    user_name: string,
}

export type AskToStartPayload = {
    game: string,
}

export type AskToExitSlotPayload = {
    game: string,
    player: string,
}

export type UsurpationPayload = {
    game: string,
    row: number,
    col: number,
    user_name: string
}

export type ErrorPayload = {
    status: number,
    message: string
}
