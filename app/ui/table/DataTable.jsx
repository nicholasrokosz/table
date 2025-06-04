import { addRow } from "../../lib/data";
import "./DataTable.css";
import SystemTableRow from "./SystemTableRow";
import DataTableHeaderCell from "./DataTableHeaderCell";
import Search from "./Search";
import Button from "../Button";

/**
 * Renders a data table with sortable columns and the ability to add new rows.
 * @param {object} props
 * @param {Array} props.data - The data to display in the table
 * @param {Array} props.columns - Configuration for the table columns
 * @param {string} props.title - The title displayed above the table
 */
export default function DataTable({ data, columns, title }) {
  return (
    <div className="data-table">
      <div className="title-row">
        <h1>{title}</h1>
        <div>
          <Search />
          <Button onClick={addRow}>Add New System</Button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            {columns.map(({ name, value }, index) => (
              <DataTableHeaderCell
                key={value}
                title={name}
                position={index + 1}
              />
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className="empty-message" colSpan={columns.length + 1}>
                No Data Available
              </td>
            </tr>
          ) : (
            data.map((row) => <SystemTableRow row={row} key={row.id} />)
          )}
        </tbody>
      </table>
    </div>
  );
}
