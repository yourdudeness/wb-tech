import { Route, Routes } from "react-router";
import { UsersPage } from "./pages/users-page";
import { UserPage } from "./pages/user-page";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersPage />} />
      <Route path="/user/:userId" element={<UserPage />} />
      <Route path="*" element={<div>404 - Страница не найдена</div>} />
    </Routes>
  );
};
