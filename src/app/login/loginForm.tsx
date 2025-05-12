"use client";
import { Form, Input, Button, Checkbox, Modal, message } from "antd";
import Image from "next/image";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import { Spin } from "antd";

export default function LoginForm() {
  const [captchaUrl, setCaptchaUrl] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const onFinish = async (values: any) => {
    setIsLogin(true);
    console.log("Received values of form: ", values);
    const { username = "", password = "", captcha = "" } = values;

    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, captcha }),
    });
    const data = await res.json();
    console.log("登录Res--", res, data);
    if (data?.isOk) {
      messageApi.success({
        content: data.message,
        key: "login",
      });
    } else {
      messageApi.error({
        content: data.message,
        key: "login",
      });
    }
    setIsLogin(false);
  };
  const onRegisterFinish = async (values: any) => {
    console.log("注册表单", values);
    setIsRegister(true);
    const { username = "", password = "", email = "" } = values;

    const res = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    });

    const data = await res.json();
    console.log("注册Res--", res, data);
    if (data?.isOk) {
      messageApi.success({
        content: data.message,
        key: "register",
      });
    } else {
      messageApi.error({
        content: data.message,
        key: "register",
      });
    }
    setIsRegister(false);
  };
  useEffect(() => {
    getCaptcha();
  }, []);
  const getCaptcha = useCallback(async () => {
    setCaptchaUrl("");
    try {
      const res = await fetch("/api/captcha");

      // 确保请求成功
      if (res.ok) {
        const blob = await res.blob(); // 将返回的图像数据转为 Blob
        const url = URL.createObjectURL(blob); // 创建一个可用于 <img> 的 URL
        console.log("blob", blob, url);

        setCaptchaUrl(url); // 更新状态以显示验证码
      } else {
        console.error("验证码加载失败");
      }
    } catch (error) {
      console.error("请求验证码出错:", error);
    }
  }, []);

  return (
    <div>
      {contextHolder}
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
            {captchaUrl ? (
              <Image
                src={captchaUrl}
                alt="验证码"
                width={100}
                height={40}
                onClick={getCaptcha}
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              />
            ) : (
              <Spin
                tip="加载中..."
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 100,
                  height: 40,
                }}
              />
            )}
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
          <Button
            loading={isLogin}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
          >
            登录
          </Button>
        </Form.Item>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          还没有账号？ <a onClick={() => setShowRegister(true)}>立即注册</a>
        </div>
      </Form>
      <Modal
        title="注册"
        open={showRegister}
        onCancel={() => setShowRegister(false)}
        footer={null}
      >
        <Form name="register" onFinish={onRegisterFinish} autoComplete="off">
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "请输入用户名!" },
              { min: 4, message: "用户名至少4个字符" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "请输入邮箱!" },
              { type: "email", message: "请输入有效的邮箱地址" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="邮箱" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "请输入密码!" },
              { min: 6, message: "密码至少6个字符" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "请确认密码!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次输入的密码不一致!"));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="确认密码" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              loading={isRegister}
              htmlType="submit"
              style={{ width: "100%" }}
            >
              注册
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
