export default function DataTable({ data, columns, title }) {
  return (
    <div className="data-table">
      <div className="title-row">
        <h1>{title}</h1>
        <div>
          <input className="search-bar" placeholder="Search" />
          <button>Add New System</button>
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
          {!data && (
            <tr>
              <td className="empty-message" colSpan={columns.length + 1}>
                No Data Available
              </td>
            </tr>
          )}
          {/* <tr> */}
          {/*   <th scope="row">Chris</th> */}
          {/*   <td>HTML tables</td> */}
          {/*   <td>22</td> */}
          {/* </tr> */}
        </tbody>
      </table>
    </div>
  );
}
