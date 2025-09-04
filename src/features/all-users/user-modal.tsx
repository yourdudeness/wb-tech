import { Button, Modal, Form } from "antd";
import { useState } from "react";
import { EditIcon } from "../../shared/icons/edit";
import { User } from "./api/get-users";
import { UserForm } from "./user-form";
import { useCreateUser } from "./hooks/use-post-user";
import { useUpdateUser } from "./hooks/use-put-user";

type Props = {
  record?: User;
  edit?: boolean;
};

const UserModal = ({ record, edit }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();

  const showModal = () => {
    if (edit && record) {
      form.setFieldsValue({
        name: record.name,
        lastName: record.lastName,
        email: record.email,
        country: record.country
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (edit && record && record.id) {
      await updateUserMutation.mutateAsync({
        userId: record.id,
        userData: values
      });
      setIsModalOpen(false);
    } else {
      try {
        await createUserMutation.mutateAsync(values);
        setIsModalOpen(false);
      } catch (error) {
        console.error("Validation Failed:", error);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {edit ? (
        <Button type="link" onClick={showModal}>
          <EditIcon />
        </Button>
      ) : (
        <Button type="primary" onClick={showModal}>
          Добавить пользователя
        </Button>
      )}

      <Modal
        title={edit ? "Редактировать пользователя" : "Добавить пользователя"}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={edit ? "Обновить" : "Создать"}
        cancelText="Отмена"
      >
        <UserForm record={record} form={form} />
      </Modal>
    </>
  );
};

export default UserModal;
