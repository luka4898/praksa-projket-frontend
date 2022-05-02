import { useState } from "react";
import "./forminput.css";
import "bootstrap/dist/css/bootstrap.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="form-floating mb-3">
      <input
        className="form-control"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => inputProps.name === "password" && setFocused(true)}
        focused={focused.toString()}
        style={{ height: 55 }}
      />
      <label htmlFor="floatingInput">{label}</label>
      <span className="custom-span">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
