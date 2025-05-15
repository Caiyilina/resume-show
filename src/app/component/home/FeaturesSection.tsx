"use client";

import React from "react";
import {
  DocumentTextIcon,
  EyeIcon,
  ShareIcon,
  CloudArrowDownIcon,
} from "@heroicons/react/24/outline";

export default function FeaturesSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-12">
          功能特性
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-6">
              <DocumentTextIcon className="h-12 w-12 text-blue-500" />
            </div>
            <h3 className="text-center text-xl font-semibold text-gray-900 mb-4">
              编辑与下载
            </h3>
            <p className="text-center text-gray-600">
              无需注册，立即体验简历编辑功能！游客可以快速编辑简历，完成后下载为高质量PDF格式。
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-6">
              <EyeIcon className="h-12 w-12 text-green-500" />
            </div>
            <h3 className="text-center text-xl font-semibold text-gray-900 mb-4">
              实时预览
            </h3>
            <p className="text-center text-gray-600">
              边编辑边预览，确保简历每个细节都完美呈现。提供多种模板，让你轻松选择最适合的风格，提升求职效果。
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-6">
              <ShareIcon className="h-12 w-12 text-purple-500" />
            </div>
            <h3 className="text-center text-xl font-semibold text-gray-900 mb-4">
              保存与分享
            </h3>
            <p className="text-center text-gray-600">
              注册后，你可以保存已编辑的简历，随时修改并更新。生成专属在线简历链接，方便分享给招聘方、朋友或同事。
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-6">
              <CloudArrowDownIcon className="h-12 w-12 text-orange-500" />
            </div>
            <h3 className="text-center text-xl font-semibold text-gray-900 mb-4">
              PDF导出
            </h3>
            <p className="text-center text-gray-600">
              编辑完成后，可以随时将简历导出为PDF格式，确保排版清晰、格式规范，轻松投递给任何雇主或公司。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
