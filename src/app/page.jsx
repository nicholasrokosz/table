import { fetchRows } from "./lib/data";
import DataTable from "./DataTable";

export default async function Home() {
  const rows = await fetchRows();
  console.log(rows);
  const columns = ["System Name", "Location", "Sleep / Awake", "Install Time"];

  return (
    <div className="page">
      <DataTable columns={columns} title="System Install" />
    </div>
  );
}
