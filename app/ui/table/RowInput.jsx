import { useState } from "react";
import "./RowInput.css";

/**
 * A reusable input component for table rows that handles blur events.
 * @param {object} props
 * @param {string} props.placeholder - The placeholder text for the input
 * @param {Function} props.onBlurAction - The function to call when the input loses focus
 * @param {string|number} props.id - The unique identifier for the input
 * @param {string} props.storedValue - The current value of the input
 */
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
