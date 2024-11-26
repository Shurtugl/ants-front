export interface BotData {
    [id: string]: [number, number, [number, number, number]]; // id du bot -> [x, y]
}

export interface BoardState {
    gen: number;
    step: number;
    board: BotData;
}