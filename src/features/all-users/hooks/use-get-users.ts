import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsers, UsersResponse } from "../api/get-users";

export const useUsersList = () => {
  const query = useQuery<UsersResponse>({
    queryKey: ["users"],
    retry: false,
    retryOnMount: false,
    queryFn: getUsers,
    placeholderData: keepPreviousData,
    select: (data) => {
      return data.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }
  });

  return query;
};
