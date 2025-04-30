"use client";
import { useEffect } from "react";
import useResumeStore from "../store/resume";
import { ResumeData } from "@/app/lib/type";

export default function ResumePage() {
  const { resumeData, isAuth, error, fetchResumeData } = useResumeStore();
  console.log("获取简历", resumeData);
  useEffect(() => {
    fetchResumeData();
    console.log("获取简历", resumeData);
  }, []);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">我的简历</h1>
      <div className="prose max-w-4xl mx-auto">
        {/* 简历内容区域 */}
        <p className="text-gray-600">简历内容正在建设中...</p>
      </div>
    </div>
  );
}
