"use client";
import { Button, Layout, Menu } from "antd";
import { useRouter } from "next/navigation";
import { useState, Suspense, memo } from "react";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useCollapsedStore } from "@/app/store/collapsedStore";

const { Header, Content, Sider } = Layout;

const AdminSider = () => {
  const router = useRouter();
  const { collapsed, toggleCollapsed } = useCollapsedStore();
  const items = [
    { key: "profile", label: "个人信息管理", icon: <UserOutlined /> },
    { key: "resume", label: "简历管理", icon: <ProfileOutlined /> },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(`/admin/${key}`);
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ paddingTop: 64, background: "#f0f0f0" }}
    >
      <div>
        <Menu
          theme="light"
          mode="inline"
          items={items}
          onClick={handleMenuClick}
          style={{ background: "#f0f0f0" }}
        />
      </div>
    </Sider>
  );
};
AdminSider.displayName = "AdminSider";
export default memo(AdminSider);
