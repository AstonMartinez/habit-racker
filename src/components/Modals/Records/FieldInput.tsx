import { Field } from "@/utils/types/habit";
import React, { useState } from "react";

type FieldInputProps = {
  field: Field;
};

const FieldInput: React.FC<FieldInputProps> = ({ field }) => {
  const [userInput, setUserInput] = useState("");
  return (
    <div>
      <label htmlFor={field.fieldLabel}>{field.fieldLabel}</label>
      <input
        className="field-inputs"
        type={field.fieldType}
        id={field.fieldLabel}
        name={field.fieldLabel}
        onChange={(e) => {
          setUserInput(e.target.value);
          console.log(userInput);
        }}
        // value={userInput}
      />
    </div>
  );
};
export default FieldInput;
