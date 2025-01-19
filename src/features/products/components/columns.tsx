"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { InferResponseType } from "hono";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { client } from "@/lib/hono";

export type ResponseType = InferResponseType<
  typeof client.api.products.$get,
  200
>["data"][0];

export const columns: ColumnDef<ResponseType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          type="button"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          商品名
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          type="button"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          価格
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          type="button"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          在庫
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>10</div>;
    },
  },
];
