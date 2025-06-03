import { addRow } from "./lib/data";
import SystemTableRow from "./SystemTableRow";
import DataTableHeaderCell from "./DataTableHeaderCell";
import Search from "./Search";
import Button from "./Button";

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
