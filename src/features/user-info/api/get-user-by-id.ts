import { apiClient } from "../../../shared/api/https-client";
import { User } from "../../all-users/api/get-users";

export const getUserById = async (userId: string) => {
  const result = await apiClient.get<User>(`users/${userId}`);

  return result.data;
};
