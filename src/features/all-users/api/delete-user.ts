import { apiClient } from "../../../shared/api/https-client";

export const deleteUser = async (userId: string): Promise<void> => {
  await apiClient.delete(`/users/${userId}`);
};