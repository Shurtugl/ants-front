import React, { createContext, useContext, useState, ReactNode } from "react";

// Type pour le contexte
interface AppContextProps {
    stepLimit: number;
    setStepLimit: (value: number) => void; // Permet de modifier la valeur
}

// Contexte initialisé
const AppContext = createContext<AppContextProps | undefined>(undefined);

// Provider pour le Contexte
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [stepLimit, setStepLimit] = useState<number>(100); // Valeur initiale

    return (
        <AppContext.Provider value={{ stepLimit, setStepLimit }}>
            {children}
        </AppContext.Provider>
    );
};

// Hook pour consommer le contexte facilement
export const useAppContext = (): AppContextProps => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
