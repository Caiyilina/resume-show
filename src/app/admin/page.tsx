"use client";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const { Content } = Layout;

export default function AdminPage({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/profile");
  }, [router]);

  return <>默认页面</>;
}
