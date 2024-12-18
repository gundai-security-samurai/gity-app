import { toast } from "@/hooks/use-toast";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.users)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.users)[":id"]["$patch"]
>["json"];

const useEditUser = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.users[":id"].$patch({
        json,
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast({
        description: "ユーザーを更新しました",
      });
      queryClient.invalidateQueries({ queryKey: ["user", { id }] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.log(error);
      toast({
        description: "ユーザーの更新に失敗しました",
        variant: "destructive",
      });
    },
  });

  return mutation;
};

export default useEditUser;
