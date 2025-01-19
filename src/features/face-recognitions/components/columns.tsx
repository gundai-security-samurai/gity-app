"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { InferResponseType } from "hono";
import { ArrowUpDown, MoreVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { client } from "@/lib/hono";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import useOpenLog from "../hooks/use-open-log";

const More = ({ id }: { id: string }) => {
  const { onOpen } = useOpenLog();
  return (
    <Button type="button" variant="ghost" onClick={() => onOpen(id)}>
      <MoreVertical />
    </Button>
  );
};

export type ResponseType = InferResponseType<
  (typeof client.api)["face-recognitions"]["$get"],
  200
>["data"][0];

export const columns: ColumnDef<ResponseType>[] = [
  {
    accessorKey: "recognition_logs.timestamp",
    header: ({ column }) => {
      return (
        <Button
          type="button"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          検知日時
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          {format(row.original.recognition_logs.timestamp, "yyyy/MM/dd HH:mm", {
            locale: ja,
          })}
        </div>
      );
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
          ユーザー名
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "payments.id",
    header: ({ column }) => {
      return (
        <Button
          type="button"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          決済履歴
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <Checkbox checked={!!row.original.payments} disabled />
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <More id={row.original.recognition_logs.id} />,
  },
];
