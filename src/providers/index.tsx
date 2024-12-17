import type { ReactNode } from "react";

import AuthProvider from "./auth-provider";
import ModalProvider from "./modal-provider";
import QueryProvider from "./query-provider";
import SheetProvider from "./sheet-provider";
import ToastProvider from "./toast-provider";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <AuthProvider>
      <QueryProvider>
        <ToastProvider />
        <SheetProvider />
        <ModalProvider />
        {children}
      </QueryProvider>
    </AuthProvider>
  );
};

export default Providers;
