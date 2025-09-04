import { apiClient } from "../../../shared/api/https-client";
import { User } from "./get-users";

export const createUser = async (userData: User): Promise<User> => {
  const result = await apiClient.post<User>("/users", userData);
  return result.data;
};
