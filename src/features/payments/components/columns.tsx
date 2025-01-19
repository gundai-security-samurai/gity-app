"use client";
import { Button } from "@/components/ui/button";
import type { client } from "@/lib/hono";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import type { InferResponseType } from "hono";
import { ArrowUpDown } from "lucide-react";

export type ResponseType = InferResponseType<
  typeof client.api.payments.$get,
  200
>["data"][0];

export const columns: ColumnDef<ResponseType>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          type="button"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          購入日時
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          {format(row.original.createdAt, "yyyy/MM/dd HH:mm", {
            locale: ja,
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          type="button"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          金額
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.original.amount} 円</div>;
    },
  },
  {
    accessorKey: "user.name",
    header: ({ column }) => {
      return (
        <Button
          type="button"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          名前
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },
];
