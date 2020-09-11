import useTable from "./useTable";
import useTableConfig from "./useTableConfig";

export type FiretableActions = {
  // TODO: Stricter types here
  column: {
    add: Function;
    resize: (index: number, width: number) => void;
    rename: Function;
    remove: Function;
    update: Function;
    reorder: Function;
  };
  row: { add: Function; delete: Function; more: Function };
  table: {
    filter: Function;
    updateConfig: Function;
    orderBy: Function;
  };
};

export type FiretableState = {
  orderBy: FiretableOrderBy;
  tablePath: string;
  config: { rowHeight: number; tableConfig: any; webhooks: any };
  columns: any[];
  rows: { [key: string]: any }[];
  queryLimit: number;
  filters: FireTableFilter[];
  loadingRows: boolean;
  loadingColumns: boolean;
};
export type FireTableFilter = {
  key: string;
  operator: "==" | "<" | ">" | ">=" | "<=" | string;
  value: string | number | boolean | string[];
};
export type FiretableOrderBy = { key: string; direction: "asc" | "desc" }[];
const useFiretable = (
  collectionName?: string,
  filters?: FireTableFilter[],
  orderBy?: FiretableOrderBy
) => {
  const [tableConfig, configActions] = useTableConfig();
  const [tableState, tableActions] = useTable();

  const filterTable = (filters: FireTableFilter[]) => {
    tableActions.dispatch({ filters });
  };
  const setOrder = (orderBy: FiretableOrderBy) => {
    tableActions.dispatch({ orderBy });
  };
  const state: FiretableState = {
    orderBy: tableState.orderBy,
    tablePath: tableState.path,
    filters: tableState.filters,
    columns: tableConfig.columns,
    config: {
      rowHeight: tableConfig.rowHeight,
      webhooks: tableConfig.doc?.webhooks,
      tableConfig,
    },
    rows: tableState.rows,
    queryLimit: tableState.limit,
    loadingRows: tableState.loading,
    loadingColumns: tableConfig.loading,
  };
  const actions: FiretableActions = {
    column: {
      add: configActions.addColumn,
      resize: configActions.resize,
      rename: configActions.rename,
      update: configActions.updateColumn,
      remove: configActions.remove,
      reorder: configActions.reorder,
    },
    row: {
      add: tableActions.addRow,
      delete: tableActions.deleteRow,
      more: tableActions.moreRows,
    },
    table: {
      updateConfig: configActions.updateConfig,
      orderBy: setOrder,
      filter: filterTable,
    },
  };

  return { tableState: state, tableActions: actions };
};

export default useFiretable;
