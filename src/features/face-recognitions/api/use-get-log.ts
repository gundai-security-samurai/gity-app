import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

const useGetLog = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["log", { id }],
    queryFn: async () => {
      const response = await client.api["face-recognitions"][":id"].$get({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch log");
      }
      const { data } = await response.json();
      return data;
    },
  });

  return query;
};

export default useGetLog;
