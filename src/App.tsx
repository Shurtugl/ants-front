import React, { useEffect, useState } from "react";
import Menu from "./components/Menu";
import ZoomableBoard from "./components/ZoomableBoard";
import { fetchParameters } from "./apis/APIParameters";
import "./styles/global.css";
import ParametersDialog from "./components/menu-comp/ParametersDialog";
import {ParamValue} from "./types/parameters";
import {fetchPause, fetchRun} from "./apis/APIGame";

const App: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [parameters, setParameters] = useState<Record<string,ParamValue> | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        // Récupérer les paramètres depuis l'API
        const loadParameters = async () => {
            try {
                const params = await fetchParameters();
                console.log(params)
                //setParameters(params);
            } catch (err) {
                setError("Failed to load parameters.");
            } finally {
                setLoading(false);
            }
        };

        loadParameters();
    }, []);

    if (loading) {
        // Afficher une page de chargement
        return (
            <div className="loading">
                <h1>Loading...</h1>
            </div>
        );
    }

    const handleSaveParameters = (updatedParameters: Record<string,ParamValue>) => {
        setParameters(updatedParameters);
        console.log("Updated Parameters:", updatedParameters);
        // Vous pouvez également envoyer les paramètres mis à jour au back ici
    };

    const handlePause = () => {
        fetchPause()
        setIsRunning(false)
    };

    const handleSnapshot = () =>{

    }

    const handleRun = () => {
        fetchRun()
        setIsRunning(true)
    };



    const handleAddDanger = () => {
        console.log("Add Danger triggered!");
    };

    const handleStatistics = () => {
        console.log("Statistics triggered!");
    };

    const handleParameters = () => {
        console.log("APIParameters triggered!");
    };

    if (error) {
        // Afficher une page d'erreur si l'API échoue
        return (
            <div className="error">
                <h1>Error</h1>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="app-container">
            <Menu
                onSnapshot={handleSnapshot}
                onPause={handlePause}
                onAddDanger={handleAddDanger}
                onStatistics={handleStatistics}
                onParameters={handleParameters}
            />
            <ZoomableBoard initialZoom={parameters?.zoom as number || 1} isRunning={isRunning}/>
            {showDialog && parameters && (
                <ParametersDialog
                    parameters={parameters}
                    onClose={() => setShowDialog(false)}
                    onSave={handleSaveParameters}
                />
            )}
        </div>
    );
};

export default App;
