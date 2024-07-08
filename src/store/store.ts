import type { GameType } from "../types";

import { create } from "zustand";

export type GamesStore = {
    games: GameType[],
    setGames: (games: GameType[]) => void
}

export type GameStore = {
    game: undefined | GameType | null,
    setGame: (game: GameType | null | undefined) => void
    loadingGame: boolean,
    setLoadingGame: (value: boolean) => void
}


export const useGames = create<GamesStore>()((set) => ({
    games: [],
    setGames: (games) => set(() => (({games})))
}))

export const useGame = create<GameStore>()((set) => ({
    game: null,
    loadingGame: true,
    setGame: (game) => set(() => ({game})),
    setLoadingGame: (val) => set(() => ({loadingGame: val}))
}))