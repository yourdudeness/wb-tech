import { useEffect } from "react";
import type { FormInstance } from "antd";
import { Form, Input } from "antd";
import { User } from "./api/get-users";

type Props = {
  record?: User;
  form: FormInstance<User>;
};

export const UserForm = ({ record, form }: Props) => {
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        name: record.name,
        lastName: record.lastName,
        email: record.email,
        country: record.country
      });
    } else {
      form.resetFields();
    }
  }, [form, record]);

  const validateMessages = {
    required: "${label} - это обязательное поле'!",
    types: {
      email: "${label} - невалидный email!"
    }
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      form={form}
      autoComplete="off"
      validateMessages={validateMessages}
    >
      <Form.Item<User> label="Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item<User>
        label="Last Name"
        name="lastName"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<User>
        label="Email"
        name="email"
        rules={[{ required: true, type: "email" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<User>
        label="Country"
        name="country"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};
