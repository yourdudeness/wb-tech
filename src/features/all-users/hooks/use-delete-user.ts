import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../api/delete-user";
import { message } from "antd";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (data, userId) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.removeQueries({ queryKey: ["user", userId] });
    },
    onError: (error: any) => {
      console.error("Delete user error:", error);
    }
  });
};
