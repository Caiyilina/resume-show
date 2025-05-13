"use client";
import { Button, Layout, Menu } from "antd";
import { useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import AdminSider from "@/app/component/admin/AdminSider";
import AdminHeader from "@/app/component/admin/AdminHeader";
const { Header, Content, Sider } = Layout;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    { key: "profile", label: "个人信息管理" },
    { key: "resume", label: "简历管理" },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(`/admin/${key}`);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSider />
      <Layout style={{ flex: 1 }}>
        <AdminHeader />
        <Suspense fallback={<div>Loading...</div>}>
          <Content style={{ padding: "24px", height: "100%" }}>
            {children}
          </Content>
        </Suspense>
      </Layout>
    </Layout>
  );
}
