import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../api/get-users";
import { createUser } from "../api/post-user";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: (newUser) => {
      queryClient.setQueryData<User[]>(["users"], (oldData) => {
        if (!oldData) return [newUser];
        return [newUser, ...oldData];
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      console.log(error);
    }
  });
};
