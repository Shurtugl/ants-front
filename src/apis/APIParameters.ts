import {gameRun, params, url} from "./URL";

export interface APIParameters {
    zoom: number;
    mapSize: number;
}

export const fetchParameters = async (): Promise<APIParameters> => {
    const response = await fetch(url + '/' + params, {
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

