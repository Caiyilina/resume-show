"use client";
import { Form, Input, Button, Checkbox, message } from "antd";
import Image from "next/image";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

// 添加title props
interface LoginFormProps {
  title: string;
}
export default function LoginForm({ title }: LoginFormProps) {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    message.success("登录成功");
  };

  return (
    <div>
      {title && <h1 style={{ textAlign: "center" }}>{title}</h1>}
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
        </Form.Item>
        <Form.Item
          name="captcha"
          rules={[{ required: true, message: "请输入验证码!" }]}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <Input placeholder="验证码" />
            <Image
              src="/captcha"
              alt="验证码"
              width={100}
              height={40}
              style={{ border: "1px solid #d9d9d9", borderRadius: 4 }}
            />
          </div>
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <a style={{ float: "right" }} href="">
            忘记密码
          </a>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
