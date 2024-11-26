import React from "react";
import Button from "./menu-comp/Button";
import "../styles/global.css";

interface IMenuProps {
    onSnapshot: () => void;
    onAddDanger: () => void;
    onStatistics: () => void;
    onParameters: () => void;
    onPause: () => void;
}

const Menu: React.FC<IMenuProps> = ({ onSnapshot, onAddDanger, onStatistics, onParameters, onPause }) => {
    return (
        <div className="menu">
            <h2>Menu</h2>
            <Button label="Snapshot" onClick={onSnapshot}/>
            <Button label="Pause" onClick={onPause}/>
            <Button label="Add Danger" onClick={onAddDanger}/>
            <Button label="Statistics" onClick={onStatistics} isDisabled={true} isActive={false} />
            <Button label="APIParameters" onClick={onParameters}/>
        </div>
    );
};

export default Menu;
