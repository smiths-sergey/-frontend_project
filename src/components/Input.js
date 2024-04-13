import { memo } from "react";
function MyInput({ name, type, value, setValue, placeholder, errorMessage }) {
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
