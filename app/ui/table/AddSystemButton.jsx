"use client";

import { addRow } from "./lib/data";

/**
 * Renders a button that adds a new system when clicked.
 * @returns {JSX.Element} A button element
 */
export default function AddSystemButton() {
  return <button onClick={addRow}>Add New System</button>;
}
