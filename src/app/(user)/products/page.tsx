import Container from "@/components/layout/container";
import OrderInfo from "@/features/orders/components/order-info";
import PurductList from "@/features/products/components/product-list";

const MerchandisePage = () => {
  return (
    <div>
      <div className="bg-secondary w-screen mx-[calc(50%-50vw)]">
        <Container className="py-4">
          <h1 className="text-primary-foreground text-3xl font-bold">
            商品一覧
          </h1>
          <p className="text-primary-foreground/80 mb-2">SHOP</p>
          <OrderInfo />
        </Container>
      </div>
      <div className="py-8">
        <PurductList />
      </div>
    </div>
  );
};

export default MerchandisePage;
