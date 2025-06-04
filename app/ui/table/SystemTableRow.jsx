"use client";

import { toggleAwake, updateLocation, updateSystemName } from "../../lib/data";
import RowInput from "./RowInput";
import Switch from "../Switch";

/**
 * Renders a single row in the systems table.
 * @param {object} props
 * @param {object} props.row - The row data to display
 * @param {string} props.row.id - The unique identifier for the row
 * @param {string} props.row.name - The name of the system
 * @param {string} props.row.location - The location of the system
 * @param {boolean} props.row.awake - Whether the system is awake or sleeping
 * @param {Date} props.row.install_time - When the system was installed
 */
export default function SystemTableRow({ row }) {
  const { id, name, location, awake, install_time } = row;

  return (
    <tr>
      <td>
        <RowInput
          placeholder="Enter System Name"
          onBlurAction={updateSystemName}
          id={id}
          storedValue={name}
        />
      </td>
      <td>
        <RowInput
          placeholder="Enter Location"
          onBlurAction={updateLocation}
          id={id}
          storedValue={location}
        />
      </td>
      <td className="awake-cell">
        <Switch active={awake} id={id} onToggle={() => toggleAwake(id)} />
        {awake ? "Awake" : "Sleeping"}
      </td>
      <td>{install_time.toLocaleString()}</td>
      <td>
        <span className="settings-link">System Settings</span>
      </td>
    </tr>
  );
}
