import React from "react";
import { Field } from "./Field"; // Assuming you have a component named GField

type InputProps = {
  id?: string;
  label: string;
  error?: string;
  type?: string;
  value: string|number;
  onChange(value: string|number): void;
};

const Input: React.FC<InputProps> = ({ id, label, error, type, onChange, ...rest }) => {
  return (
    <Field label={label} error={error}>
      <input
        {...rest}
        id={id}
        type={type || "text"}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
};

export default Input;
