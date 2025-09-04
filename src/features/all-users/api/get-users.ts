import { apiClient } from "../../../shared/api/https-client";
export interface User {
  name: string;
  lastName: string;
  email: string;
  country: string;
  id: string;
}

export type UsersResponse = User[];

export const getUsers = async () => {
  const result = await apiClient.get<UsersResponse>("/users", {});

  return result.data;
};
