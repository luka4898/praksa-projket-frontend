import { useState } from "react";
import "./forminput.css";
import 'bootstrap/dist/css/bootstrap.css';



const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <div className="form-group justify-content-center">
            <label className="m-2 custom-label">{label}</label>
            <input className="custom-input"
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() =>
                    inputProps.name === "password" && setFocused(true)
                }
                focused={focused.toString()}
            />
            <span className="custom-span">{errorMessage}</span>
        </div>
    );
};

export default FormInput;