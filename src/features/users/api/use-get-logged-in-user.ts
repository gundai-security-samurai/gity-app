import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

const useGetLoggedInUser = () => {
  const query = useQuery({
    queryKey: ["user", "me"],
    queryFn: async () => {
      const response = await client.api.users.me.$get();
      if (!response.ok) {
        throw new Error("Failed to fetch logged in user");
      }
      const { data } = await response.json();
      if (!data) {
        throw new Error("No data returned from API");
      }
      return data;
    },
  });

  return query;
};

export default useGetLoggedInUser;
