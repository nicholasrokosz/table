"use client";

import { addRow } from "./lib/data";

export default function AddSystemButton() {
  return <button onClick={addRow}>Add New System</button>;
}
