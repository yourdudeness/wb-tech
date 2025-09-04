import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../api/put-user";
import { User } from "../api/get-users";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, userData }: { userId: string; userData: User }) =>
      updateUser(userId, userData),
    onSuccess: (updatedUser, { userId }) => {
      queryClient.setQueryData<User[]>(["users"], (oldData) => {
        if (!oldData) return [];
        return oldData.map((user) => (user.id === userId ? updatedUser : user));
      });

      queryClient.setQueryData(["user", userId], updatedUser);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Ошибка при обновлении пользователя";
    }
  });
};
