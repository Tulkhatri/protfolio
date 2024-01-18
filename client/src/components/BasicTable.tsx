import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import MOCK_DATA from "../components/MOCK_DATA.json";
import { COLUMNS } from "./Column";
import { COLUMN_TYPES } from "./types";

const BasicTable = () => {
  const columnDef = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  //   const columnHelper = createColumnHelper<User>()
  const tableInstance = useReactTable({
    columnDef,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(), //order doesn't matter anymore!
    // etc.
  });
  return (
    <div>{tableInstance.getHeaderGroups().map((item) => item.headers)}</div>
  );
};

export default BasicTable;
