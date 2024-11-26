import React, {useEffect, useState} from "react";
import {Layer, Rect, Text} from "react-konva";
import {fetchBoardAt, fetchBoardState} from "../../apis/APIGame";
import {BoardState} from "../../types/board";
import {useAppContext} from "../../AppContext";

interface iAnimatedBoardProps {
    isRunning: boolean;
    generation?: number
}

const AnimatedBoard: React.FC<iAnimatedBoardProps> = ({isRunning, generation}) => {
    const { stepLimit } = useAppContext();
    const [boardState, setBoardState] = useState<BoardState | null>(null);
    const [currentStep, setCurrentStep] = useState<number>(0);

    // Fonction pour récupérer l'état du board et mettre à jour l'état du composant
    const getBoardState = async () => {
        try {
            const newBoardState = await fetchBoardState();
            console.log(newBoardState)
            setBoardState(newBoardState);
        } catch (error) {
            console.error("Erreur lors de la récupération de l'état du board:", error);
        }
    };

    // Gestion des fetchs pour afficher les étapes séquentiellement
    useEffect(() => {
        console.log("running" + isRunning)
        if (isRunning && generation) {
            const intervalId = setInterval(() => {
                if (currentStep < 300) {
                    fetchBoardAt(generation, currentStep);
                    setCurrentStep((prevStep) => prevStep + 1); // Passer à l'étape suivante
                } else {
                    clearInterval(intervalId); // Arrête à la dernière étape
                }
            }, 100); // Intervalle pour afficher chaque étape
            return () => clearInterval(intervalId); // Cleanup
        } else if (isRunning) {
            getBoardState(); // Refait le fetch à intervalle régulier
        }
    }, [isRunning, generation, currentStep, stepLimit]);


    return (
        <Layer>
            {/* Affichage des bots */}
            {boardState &&
                Object.entries(boardState.board).map(([id, [x, y, [red, green, blue]]]) => (
                    <Rect
                        key={id}
                        x={x}
                        y={y}
                        width={3}
                        height={3}
                        fill={`rgb(${red}, ${green}, ${blue})`}
                        strokeWidth={0}
                    />
                ))}

            {/* Indicateur de génération et étape */}
            {boardState && (
                <Text
                    x={10}
                    y={-20}
                    text={`Generation: ${boardState.gen}, Step: ${boardState.step}`}
                    fontSize={20}
                    fill="black"
                />
            )}
        </Layer>
    );
};

export default AnimatedBoard;
