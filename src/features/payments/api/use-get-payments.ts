import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

const useGetPayments = (userId?: string) => {
  const query = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const response = await client.api.payments.$get({ query: { userId } });
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const { data } = await response.json();
      return data;
    },
  });

  return query;
};

export default useGetPayments;
