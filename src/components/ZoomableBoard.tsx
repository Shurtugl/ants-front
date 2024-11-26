import React, {useEffect, useRef, useState} from "react";
import {Stage} from "react-konva";
import "../styles/global.css";
import AnimatedBoard from "./game-comp/AnimatedBoard";

interface IBoardProps {
    initialZoom?: number;
    isRunning:boolean;
}

const ZoomableBoard: React.FC<IBoardProps> = ({initialZoom = 1, isRunning}) => {
    const stageRef = useRef<any>(null); // Référence pour le Stage de Konva
    const [scale, setScale] = useState(initialZoom); // Niveau de zoom
    const [position, setPosition] = useState({x: 0, y: 0}); // Position de la vue

    // Gérer le zoom avec le clavier
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "+" || e.key === "=") {
            // Zoom In
            setScale((prev) => Math.min(prev + 0.1, 5)); // Limiter le zoom maximum à 5
        } else if (e.key === "-") {
            // Zoom Out
            setScale((prev) => Math.max(prev - 0.1, 0.5)); // Limiter le zoom minimum à 0.5
        }
    };

    // Ajouter et nettoyer les écouteurs d'événements clavier
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    // Gérer le déplacement ou zoom via la souris (optionnel)
    const handleWheel = (e: any) => {
        e.evt.preventDefault();
        const stage = stageRef.current;
        const oldScale = stage.scaleX();
        const mousePointTo = {
            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
        };

        // Calculer le nouveau zoom
        const newScale = e.evt.deltaY > 0 ? oldScale * 0.9 : oldScale * 1.1;
        setScale(Math.max(0.5, Math.min(5, newScale)));

        // Mettre à jour la position de la vue
        setPosition({
            x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
            y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
        });
    };

    return (
        <div className="board">
            <Stage
                width={window.innerWidth - 290} // Largeur ajustée (en tenant compte du menu)
                height={window.innerHeight - 40} // Hauteur ajustée
                scaleX={scale}
                scaleY={scale}
                x={position.x}
                y={position.y}
                draggable
                onWheel={handleWheel}
                ref={stageRef}
            >
                <AnimatedBoard isRunning={isRunning} generation={8}/>
            </Stage>
        </div>
    );
};

export default ZoomableBoard;
