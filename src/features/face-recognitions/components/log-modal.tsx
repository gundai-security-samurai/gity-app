"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useMedia } from "react-use";
import useGetLog from "../api/use-get-log";
import useOpenLog from "../hooks/use-open-log";

const LogModal = () => {
  const { id, isOpen, onClose } = useOpenLog();

  const md = useMedia("(min-width: 768px)", false);

  const logQuery = useGetLog(id);
  const log = logQuery.data;

  if (logQuery.isLoading || !log) {
    return null;
  }

  if (md) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader className="text-start">
            <DialogTitle>ログ詳細</DialogTitle>
            <DialogDescription className="text-start">
              {format(log.recognition_logs.timestamp, "yyyy/MM/dd HH:mm", {
                locale: ja,
              })}
            </DialogDescription>
          </DialogHeader>
          <div className=" space-y-2">
            <p className="">{log.user.name}</p>
            <Separator />
            {log.payments ? (
              <div className="space-y-2">
                <p className="">Square決済ID: {log.payments.squarePaymentId}</p>
                <p className="text-xl">
                  金額: {`${log.payments.amount.toLocaleString()}円`}
                </p>
              </div>
            ) : (
              <p className="">対応する決済履歴はありません。</p>
            )}
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader className="text-start">
          <DrawerTitle>ログ詳細</DrawerTitle>
          <DrawerDescription className="text-start">
            {format(log.recognition_logs.timestamp, "yyyy/MM/dd HH:mm", {
              locale: ja,
            })}
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 space-y-2">
          <p className="">{log.user.name}</p>
          <Separator />
          {log.payments ? (
            <div className="space-y-2">
              <p className="">Square決済ID: {log.payments.squarePaymentId}</p>
              <p className="text-xl">
                金額: {`${log.payments.amount.toLocaleString()}円`}
              </p>
            </div>
          ) : (
            <p className="">対応する決済履歴はありません。</p>
          )}
        </div>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default LogModal;
