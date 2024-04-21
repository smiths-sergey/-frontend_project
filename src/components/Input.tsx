import React from 'react';
import { memo } from "react";

type CallbackFunction = (result: string) => void;
interface MuInputProps {
    name: string,
    type: string,
    value: string,
    placeholder: string,
    setValue: CallbackFunction
}

const MyInput: React.FC<MuInputProps> = ({ name, type, value, setValue, placeholder}) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      placeholder={placeholder ? placeholder : ""}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
export default memo(MyInput);

