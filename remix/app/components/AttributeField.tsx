import React from "react";
import { Field } from "./Field"; // Assuming you have a component named GField

type AttributeFieldProps = {
  id?: string;
  label: string;
  error?: string;
  type?: string;
  value: string | number;
  onChange(value: string | number): void;
};

const AttributeField: React.FC<AttributeFieldProps> = ({
  id,
  label,
  error,
  type,
  onChange,
  ...rest
}) => {
  return (
    <label className="flex gap-1">
      <input
        {...rest}
        id={id}
        type={type || "text"}
        className="h-fit"
        size={3}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="w-fit text-nowrap">{label}</span>
    </label>
  );
};

export default AttributeField;
