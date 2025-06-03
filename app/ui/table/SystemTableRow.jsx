"use client";

import { toggleAwake, updateLocation, updateSystemName } from "../../lib/data";
import RowInput from "./RowInput";
import Switch from "../Switch";

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
