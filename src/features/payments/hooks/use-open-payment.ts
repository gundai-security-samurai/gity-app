import { create } from "zustand";

type OpenPaymentState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useOpenPayment = create<OpenPaymentState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useOpenPayment;
