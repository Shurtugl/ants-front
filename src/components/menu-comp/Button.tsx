import React, { useState } from "react";
import "../../styles/global.css"

interface IButtonProps {
    label: string;
    onClick: () => void;
    isActive?: boolean; // Définit si le bouton peut être "Active" (temporisé)
    isDisabled?: boolean; // Définit si le bouton est désactivé
}

const Button: React.FC<IButtonProps> = ({ label, onClick, isActive = false, isDisabled = false }) => {
    const [isTemporarilyActive, setIsTemporarilyActive] = useState(false);

    const handleClick = () => {
        if (isDisabled) return;

        if (isActive) {
            setIsTemporarilyActive(true);
            onClick();
            // Simule une fonction temporisée; le bouton revient à normal après un délai (ou une action manuelle)
            setTimeout(() => setIsTemporarilyActive(false), 2000);
        } else {
            onClick();
        }
    };

    // Définir la classe CSS selon l'état
    let buttonClass = "button-normal";
    if (isDisabled) buttonClass = "button-disabled";
    else if (isTemporarilyActive) buttonClass = "button-active";

    return (
        <button className={buttonClass} onClick={handleClick} disabled={isDisabled}>
            {label}
        </button>
    );
};

export default Button;
