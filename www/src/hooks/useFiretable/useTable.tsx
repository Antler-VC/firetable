import { useEffect } from "react";
import useCollectionTable from "./useCollectionTable";
import { FireTableFilter } from ".";

const collectionPathFormatter = (pathName) => {
  const items = pathName.replace("/table/", "").split("/");
  return [items[0], ...items.filter((_, i) => i % 2 === 1)].join("/");
};
const useTable = () => {
  const [tableState, tableActions] = useCollectionTable(null);

  const pathName = window.location.pathname;
  useEffect(() => {
    if (pathName.includes("table")) {
      const collectionPath = collectionPathFormatter(pathName);
      tableActions.dispatch({
        path: collectionPath,
        rows: [],
        orderBy: [],
      });
    }
    // if (filters) tableActions.dispatch({ filters });
  }, [pathName]);

  return [tableState, tableActions];
};

export default useTable;
