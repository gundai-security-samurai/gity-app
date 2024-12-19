import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

const useGetRecentOrder = () => {
  const query = useQuery({
    queryKey: ["orders", "payments"],
    queryFn: async () => {
      const response = await client.api.users.me.orders.latest.$get();
      if (!response.ok) {
        throw new Error("Failed to fetch order");
      }
      const { data } = await response.json();
      return data;
    },
  });

  return query;
};

export default useGetRecentOrder;
