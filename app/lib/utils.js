export const filterRows = (rows, query) =>
  rows.filter(({ name, location }) => {
    const normalizedName = name?.toLowerCase().trim();
    const normalizedLocation = location?.toLowerCase().trim();
    const normalizedSearchTerm = query.toLowerCase().trim();

    return (
      (normalizedName && normalizedName.includes(normalizedSearchTerm)) ||
      (normalizedLocation && normalizedLocation.includes(normalizedSearchTerm))
    );
  });

export const sortRows = (rows, columns, selectedColumnPosition, desc) =>
  rows.toSorted((a, b) => {
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
