"use client";

import { useState } from "react";
import { addRow } from "./lib/data";
import SystemTableRow from "./SystemTableRow";

export default function DataTable({ data, columns, title }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedData, setSearchedData] = useState(data);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    if (!e.target.value) {
      setSearchedData(data);
    } else {
      // basic search for name and location columns
      const filteredData = data.filter(({ name, location }) => {
        const normalizedName = name?.toLowerCase().trim();
        const normalizedLocation = location?.toLowerCase().trim();
        const normalizedSearchTerm = e.target.value.toLowerCase().trim();

        return (
          (normalizedName && normalizedName.includes(normalizedSearchTerm)) ||
          (normalizedLocation &&
            normalizedLocation.includes(normalizedSearchTerm))
        );
      });

      setSearchedData(filteredData);
    }
  };

  return (
    <div className="data-table">
      <div className="title-row">
        <h1>{title}</h1>
        <div>
          <input
            className="search-bar"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button onClick={addRow}>Add New System</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {searchedData.length === 0 ? (
            <tr>
              <td className="empty-message" colSpan={columns.length + 1}>
                No Data Available
              </td>
            </tr>
          ) : (
            searchedData.map((row) => <SystemTableRow row={row} key={row.id} />)
          )}
        </tbody>
      </table>
    </div>
  );
}
