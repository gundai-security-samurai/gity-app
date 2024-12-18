import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";

import { toast } from "@/hooks/use-toast";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.payments.$post>;
type RequestType = InferRequestType<typeof client.api.payments.$post>["json"];

const useCreatePayment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json: RequestType) => {
      const response = await client.api.payments.$post({ json });
      return (await response.json()) as ResponseType;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      toast({
        description: "ご購入ありがとうございました！",
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        description: "支払いに失敗しました",
        variant: "destructive",
      });
    },
  });

  return mutation;
};

export default useCreatePayment;
