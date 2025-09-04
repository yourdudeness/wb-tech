import Table, { TableProps } from "antd/es/table";
import { useUsersList } from "./hooks/use-get-users";
import { User } from "./api/get-users";
import { Button, message, Space } from "antd";
import { DeleteIcon } from "../../shared/icons/remove";
import { useDeleteUser } from "./hooks/use-delete-user";
import UserModal from "./user-modal";
import { Link } from "react-router";

type ColumnsType<T extends object = object> = TableProps<T>["columns"];

export const UsersList = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const deleteUserMutation = useDeleteUser();

  const handleDeleteUser = async (userId: string, userName: string) => {
    try {
      await deleteUserMutation.mutateAsync(userId);
      messageApi.success(`Пользователь ${userName} удален!`);
    } catch (error) {
      messageApi.error("Ошибка при удалении!");
    }
  };

  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
      render: (text, record) => (
        <Link
          to={{
            pathname: `/user/${record.id}`
          }}
          state={{ user: record }}
        >
          {text}
        </Link>
      )
    },

    {
      title: "Last Name",
      dataIndex: "lastName",
      width: "20%"
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%"
    },
    {
      title: "Country",
      dataIndex: "country"
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <UserModal record={record} edit />
          <Button
            type="link"
            danger
            onClick={() => handleDeleteUser(record.id, record.name)}
          >
            <DeleteIcon />
          </Button>
        </Space>
      )
    }
  ];

  const usersList = useUsersList();

  return (
    <>
      {contextHolder}
      <UserModal />
      <Table<User>
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={usersList.data}
        loading={usersList.isLoading}
        className="w-screen"
      />
    </>
  );
};
