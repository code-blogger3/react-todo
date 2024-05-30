import React from "react";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { removeTodo } from "@/redux/todo/todoSlice";
import EditableCell from "./EditableCell";
import { useDeleteTodo } from "@/hooks/useDeleteTodo";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => {
      return (
        <Checkbox
          // checked={row.original.completed}
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Name
    //       <CaretSortIcon className="ml-2 h-4 w-4" />
    //     </Button>
    //   );
    // },
    // cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
    header: "Name",
    cell: EditableCell,
  },
  {
    accessorKey: "todoCategory",
    header: "Todo category",
  },
  {
    accessorKey: "importantUrgentCategory",
    header: "Important / Urgent",
  },
  {
    accessorKey: "PriorityNum",
    header: "priority",
  },
  {
    accessorKey: "completed",
    header: "status",
    cell: ({ row }) => {
      const completed = row.original.completed;
      return <>{completed ? <>completed</> : <>incomplete</>}</>;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const dispatch = useDispatch();
      const todo = row.original;
      const { mutate } = useDeleteTodo();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Action</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => mutate(todo._id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
