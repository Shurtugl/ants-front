import React, {useState} from "react";
import "../../styles/global.css"
import {ParamValue} from "../../types/parameters";

interface IParametersDialogProps {
    parameters: Record<string, ParamValue>;
    onClose: () => void;
    onSave: (updatedParameters: Record<string, any>) => void;
}

const ParametersDialog: React.FC<IParametersDialogProps> = ({
                                                                parameters,
                                                                onClose,
                                                                onSave,
                                                            }) => {
    const [formValues, setFormValues] = useState<Record<string, ParamValue>>(parameters);

    const handleChange = (key: string, value: string | number | number[]) => {
        setFormValues((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = () => {
        onSave(formValues);
        onClose();
    };

    return (
        <div className="dialog-overlay">
            <div className="dialog">
                <h2>Modify Parameters</h2>
                <form className="parameters-form">
                    {Object.keys(parameters).map((key) => (
                        <div className="form-group" key={key}>
                            <label htmlFor={key}>{key}</label>
                            <input
                                id={key}
                                type={Array.isArray(parameters[key]) ? "text" : "number"}
                                value={
                                    parameters[key]?.toString()
                                    // Array.isArray(parameters[key])
                                    //     ? parameters[key]!.join(", ")
                                    //     : parameters[key]
                                }
                                onChange={(e) =>
                                    handleChange(
                                        key,
                                        Array.isArray(parameters[key])
                                            ? e.target.value.split(",").map(Number)
                                            : Number(e.target.value)
                                    )
                                }
                            />
                        </div>
                    ))}
                    <div className="form-actions">
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="button" onClick={handleSubmit}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ParametersDialog;
