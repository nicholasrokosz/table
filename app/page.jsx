import { clearTable, fetchRows } from "./lib/data";
import { filterRows, sortRows } from "./lib/utils";
import DataTable from "./ui/table/DataTable";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const query = params?.query || "";
  const selectedColumnPosition = params?.column || 1;
  const desc = params?.desc || false;
  const rows = await fetchRows();

  const columns = [
    {
      name: "System Name",
      value: "name",
      sortType: "text",
    },
    {
      name: "Location",
      value: "location",
      sortType: "text",
    },
    {
      name: "Sleep / Awake",
      value: "awake",
      sortType: "bool",
    },
    {
      name: "Install Time",
      value: "install_time",
      sortType: "time",
    },
  ];

  const filteredRows = query ? filterRows(rows, query) : rows;

  const sortedFilteredRows = sortRows(
    filteredRows,
    columns,
    selectedColumnPosition,
    desc,
  );

  return (
    <div className="page">
      <DataTable
        data={sortedFilteredRows}
        columns={columns}
        title="System Install"
      />
      {/* <button onClick={clearTable}>Clear Table</button> */}
    </div>
  );
}
