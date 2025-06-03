import { clearTable, fetchRows } from "./lib/data";
import DataTable from "./DataTable";

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

  // TODO: consider moving to utils
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

  const sortedFilteredRows = filteredRows.toSorted((a, b) => {
    const { value, sortType } = columns[selectedColumnPosition - 1];

    switch (sortType) {
      case "text":
        // place empty text and location values at the end
        if (!a[value] && !b[value]) return 0;
        if (!a[value]) return 1;
        if (!b[value]) return -1;

        return desc
          ? b[value].localeCompare(a[value])
          : a[value].localeCompare(b[value]);
      case "bool":
        return desc ? a[value] - b[value] : b[value] - a[value];
      case "time":
        return desc
          ? new Date(b[value]) - new Date(a[value])
          : new Date(a[value]) - new Date(b[value]);
    }
  });

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
