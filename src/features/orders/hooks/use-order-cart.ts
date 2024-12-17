import { create } from "zustand";

type OrderCartState = {
  productIds: string[];
  addProduct: (id: string) => void;
  removeProduct: (id: string) => void;
  clearCart: () => void;
};

const useOrderCart = create<OrderCartState>((set) => ({
  productIds: [],
  addProduct: (productId) => {
    set((state) => ({
      productIds: [...state.productIds, productId],
    }));
  },
  removeProduct: (productId) => {
    set((state) => ({
      productIds: state.productIds.filter((id) => id !== productId),
    }));
  },
  clearCart: () => {
    set(() => ({ productIds: [] }));
  },
}));

export default useOrderCart;
