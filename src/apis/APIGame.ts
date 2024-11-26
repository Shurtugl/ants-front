// Fonction pour fetch l'état actuel du board
import {gamePause, gameRun, getBoard, url} from "./URL";
import {APIParameters} from "./APIParameters";
import {BoardState} from "../types/board";

export const fetchBoardState = async (): Promise<BoardState> => {
    console.log('fetch boardstate')
    const response = await fetch(url + '/' + getBoard, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch board state");
    }
    return response.json(); // Retourne les données json
};

export const fetchBoardAt = async (gen: number, step: number): Promise<BoardState> => {
    console.log('fetch boardstate')
    const response = await fetch(url + '/' + getBoard + '/' + gen + '/' + step, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch board state");
    }
    return response.json(); // Retourne les données json
};

export const fetchRun = async (): Promise<APIParameters> => {
    console.log('fetch run')
    const response = await fetch(url + '/' + gameRun, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch parameters: ${response.status}`);
    }
    return response.json();
};

export const fetchPause = async (): Promise<APIParameters> => {
    console.log('fetch Pause')
    const response = await fetch(url + '/' + gamePause, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch parameters: ${response.status}`);
    }
    return response.json();
};
