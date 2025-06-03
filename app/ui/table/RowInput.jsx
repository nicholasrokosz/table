import { useState } from "react";
import "./RowInput.css";

export default function RowInput({
  placeholder,
  onBlurAction,
  id,
  storedValue,
}) {
  const [value, setValue] = useState(storedValue ?? "");

  return (
    <input
      className="row-input"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => onBlurAction(id, value)}
    />
  );
}
