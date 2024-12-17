import { Card, CardHeader, CardImage, CardTitle } from "@/components/ui/card";
import type { client } from "@/lib/hono";
import type { InferResponseType } from "hono/client";

interface Props {
  data: NonNullable<
    InferResponseType<typeof client.api.products.$get>["data"]
  >[0];
}

const ProductItem = ({ data }: Props) => {
  return (
    <Card className="overflow-hidden">
      {data.image ? (
        <div className="relative">
          <CardImage src={data.image} className="object-cover" />
          <p className="absolute bottom-3 right-4 bg-background rounded-md px-2">
            {`¥${data.price.toLocaleString()}`}
          </p>
        </div>
      ) : (
        <p className="text-xl px-2 pt-4 text-start">{`¥${data.price.toLocaleString()}`}</p>
      )}
      <CardHeader className="px-2 py-4">
        <CardTitle className="text-start">{data.name}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default ProductItem;
