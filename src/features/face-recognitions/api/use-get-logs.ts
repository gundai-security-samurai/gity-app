import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

const useGetLogs = () => {
  const query = useQuery({
    queryKey: ["logs"],
    queryFn: async () => {
      const response = await client.api["face-recognitions"].$get();
      if (!response.ok) {
        throw new Error("Failed to fetch logs");
      }
      const { data } = await response.json();
      return data;
    },
  });

  return query;
};

export default useGetLogs;
