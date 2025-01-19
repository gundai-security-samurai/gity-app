"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { InferResponseType } from "hono";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { client } from "@/lib/hono";

export type ResponseType = InferResponseType<
  typeof client.api.users.$get,
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
          名前
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          type="button"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          メールアドレス
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },
];
