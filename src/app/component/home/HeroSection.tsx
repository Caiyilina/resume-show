"use client";
import React from "react";

// TODO 待完善
export default function HeroSection() {
  return (
    <section className="hero-section flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 p-8 lg:p-16">
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
          轻松创建专业简历
        </h1>
        <p className="text-lg lg:text-xl text-gray-600">
          从编辑到分享，轻松制作专业简历。游客可编辑与导出，注册后保存与分享。{" "}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-medium px-6 py-3 rounded-lg">
            创建简历
          </button>
        </div>
        <p className="text-sm text-gray-500">
          无论你是第一次写简历还是需要更新现有简历，我们为你提供简单、高效、专业的在线简历编辑工具。
        </p>
      </div>
      <div className="w-full lg:w-1/2 bg-gray-100 rounded-lg aspect-video">
        {/* 这里可以放置图片或动画 */}
      </div>
    </section>
  );
}
