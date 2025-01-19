import LogModal from "@/features/face-recognitions/components/log-modal";
import PaymentModal from "@/features/payments/components/payment-modal";
import ProductDetailModal from "@/features/products/components/product-detail-modal";

const ModalProvider = () => {
  return (
    <>
      <PaymentModal />
      <ProductDetailModal />
      <LogModal />
    </>
  );
};

export default ModalProvider;
