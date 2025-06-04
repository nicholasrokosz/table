"use client";

import "./DataTableHeaderCell.css";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Button from "../Button";

/**
 * Renders a sortable table header cell with click handling for sorting.
 * @param {object} props
 * @param {string} props.title - The text to display in the header
 * @param {number} props.position - The position of the column (1-based index)
 */
export default function DataTableHeaderCell({ title, position }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const columnParam = +searchParams.get("column");
  const descParam = !!searchParams.get("desc");

  const selected = !columnParam ? position === 1 : position === columnParam;

  const handleHeaderClick = () => {
    const params = new URLSearchParams(searchParams);

    if (position === 1) {
      params.delete("column");
    } else {
      params.set("column", position);
    }

    if (selected && !descParam) {
      params.set("desc", true);
    } else {
      params.delete("desc");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <th className={selected ? "selected-header" : "unselected-header"}>
      {selected ? (
        <Button onClick={handleHeaderClick} className="selected-header-button">
          {title}
        </Button>
      ) : (
        <Button onClick={handleHeaderClick}>{title}</Button>
      )}
    </th>
  );
}
