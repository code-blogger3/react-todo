import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTodo, updateTodo } from "../redux/todo/todoSlice";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { current } from "@reduxjs/toolkit";
function TodoTable({ columns, data, todosCount }) {
  // const [isEditing, setIsEditing] = useState(false);
  // const [editTodoValue, setEditTodoValue] = useState(todo?.name);
  // const [completed, setCompleted] = useState(todo?.completed);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 6,
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // const editTodo = (name) => {
  //   dispatch(updateTodo({ id: todo?.id, name }));
  //   setIsEditing((prev) => !prev);
  // };
  // useEffect(() => {
  //   dispatch(toggleTodo({ id: todo?.id, completed }));
  // }, [completed]);

  return (
    <>
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter name..."
            value={table.getColumn("name")?.getFilterValue() || ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : ""}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          {/* <span className="block text-sm text-muted-foreground">
            
          </span> */}
          <div className="space-x-2">
            <Pagination>
              <PaginationContent>
                <Button
                  variant="ghost"
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  {"<<"}
                </Button>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  />
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  />
                </PaginationItem>
                <Button
                  variant="ghost"
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                >
                  {">>"}
                </Button>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoTable;

// {
//   isEditing ? (
//     <div className="flex gap-1 justify-between" key={todo?.id}>
//       <input
//         type="text"
//         className="border-sky-400"
//         value={editTodoValue}
//         onChange={(e) => setEditTodoValue(e.target.value)}
//       />
//       <span className="flex gap-2">
//         <button onClick={() => editTodo(editTodoValue)}>Save</button>
//         <button onClick={() => setIsEditing((prev) => !prev)}>Cancel</button>
//       </span>
//     </div>
//   ) : (
//     <div className="flex gap-3 justify-between" key={todo?.id}>
//       <label>
//         <input
//           type="checkbox"
//           checked={completed}
//           onChange={() => setCompleted((prev) => !prev)}
//         />
//         <span className={`p-3 ${completed ? "line-through" : ""}`}>
//           {todo?.name}
//         </span>
//       </label>
//       <span className="flex gap-4">
//         <button onClick={() => dispatch(removeTodo(todo?.id))}>X</button>
//         <button onClick={() => setIsEditing((prev) => !prev)}>update</button>
//       </span>
//     </div>
//   );
// }
{
  /* <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button> */
}
