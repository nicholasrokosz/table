"use client";

import { toggleAwake } from "./lib/data";
import Switch from "./Switch";

export default function SystemTableRow({ row }) {
  const { id, name, location, awake, install_time } = row;

  return (
    <tr>
      <th>{name}</th>
      <td>{location}</td>
      <td className="awake-cell">
        <Switch active={awake} id={id} onToggle={() => toggleAwake(id)} />
        {awake ? "Awake" : "Sleeping"}
      </td>
      <td>{install_time.toLocaleString()}</td>
      <td>System Settings</td>
    </tr>
  );
}
