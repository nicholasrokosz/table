import { clearTable, fetchRows } from "./lib/data";
import DataTable from "./DataTable";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const query = params?.query || "";
  const rows = await fetchRows();
  console.log(rows);
  const columns = ["System Name", "Location", "Sleep / Awake", "Install Time"];

  const filteredRows = query
    ? rows.filter(({ name, location }) => {
        const normalizedName = name?.toLowerCase().trim();
        const normalizedLocation = location?.toLowerCase().trim();
        const normalizedSearchTerm = query.toLowerCase().trim();

        return (
          (normalizedName && normalizedName.includes(normalizedSearchTerm)) ||
          (normalizedLocation &&
            normalizedLocation.includes(normalizedSearchTerm))
        );
      })
    : rows;

  return (
    <div className="page">
      <DataTable data={filteredRows} columns={columns} title="System Install" />
      {/* <button onClick={clearTable}>Clear Table</button> */}
    </div>
  );
}
