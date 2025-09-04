import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../api/get-user-by-id";
import { User } from "../../all-users/api/get-users";

export const useUserById = (userId: string) => {
  const query = useQuery<User>({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId
  });
  return query;
};
