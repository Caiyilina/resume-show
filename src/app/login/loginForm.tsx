"use client";
import { Form, Input, Button, Checkbox, message } from "antd";
import Image from "next/image";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import { Spin } from "antd";

export default function LoginForm() {
  const [captchaUrl, setCaptchaUrl] = useState("");
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    message.success("登录成功");
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
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
