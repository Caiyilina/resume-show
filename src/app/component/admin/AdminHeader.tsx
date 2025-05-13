"use client";
import { Button, Layout } from "antd";
import { useState, memo } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useCollapsedStore } from "@/app/store/collapsedStore";

const { Header } = Layout;

const AdminHeader = () => {
  const { collapsed, toggleCollapsed } = useCollapsedStore();

  return (
    <Header style={{ padding: 0, background: "#fff" }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleCollapsed}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
    </Header>
  );
};
AdminHeader.displayName = "AdminHeader";
export default memo(AdminHeader);
