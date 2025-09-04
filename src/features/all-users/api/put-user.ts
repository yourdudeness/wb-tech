import { apiClient } from "../../../shared/api/https-client";
import { User } from "./get-users";

export const updateUser = async (
  userId: string,
  userData: User
): Promise<User> => {
  const result = await apiClient.put<User>(`/users/${userId}`, userData);
  return result.data;
};
