import React from "react";
import "./Switch.css";

/**
 * Renders a Switch that toggles on or toggles off.
 * @param {object} props
 * @param {boolean} [props.active] whether or not the switch is On or Off
 * @param {function} [props.onToggle] callback for the click event on the Switch
 * @param {boolean} [props.disabled] if the switch should be disabled
 */
function Switch(props) {
  const { active, onToggle, disabled } = props;

  const handleSwitch = (e) => {
    e.stopPropagation();
    if (disabled ?? false) return;
    onToggle?.();
  };

  return (
    <div
      onClick={handleSwitch}
      role="presentation"
      className={`switch-container ${active ? "active" : "inactive"} ${disabled ? "disabled" : ""}`}
    >
      <input type="checkbox" checked={active ?? false} readOnly />
      <div
        className={`switch-circle ${active ? "active" : "inactive"} ${disabled ? "disabled" : ""}`}
      />
    </div>
  );
}

export default Switch;
