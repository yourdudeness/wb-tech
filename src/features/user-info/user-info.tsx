import { useParams } from "react-router";
import { useUserById } from "./hooks/use-get-user-by-id";

export const UserDetail = () => {
  const { userId } = useParams<{ userId: string }>();
  if (!userId) {
    return <div>Пользователь не найден</div>;
  }

  const userDetailInfo = useUserById(userId);

  if (userDetailInfo.isLoading) return <div>Загрузка...</div>;
  if (userDetailInfo.error)
    return <div>Ошибка: {userDetailInfo.error.message}</div>;

  if (!userDetailInfo.data) {
    return <div>Данные пользователя не найдены</div>;
  }

  return (
    <div className="flex flex-col justify-center w-screen gap-2 items-center">
      <h1>
        {userDetailInfo.data.name} {userDetailInfo.data.lastName}
      </h1>
      <p>Email: {userDetailInfo.data.email}</p>
      <p>Country: {userDetailInfo.data.country}</p>
    </div>
  );
};
