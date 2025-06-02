export default function DataTableHeaderCell({ title, selected }) {
  // if (!selected) return <th>{title}</th>;
  return (
    <th className={selected ? "selected-header" : "unselected-header"}>
      <div className={selected ? "selected-header-button" : ""}>{title}</div>
    </th>
  );
}
