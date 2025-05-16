"use client";
import React, { useState } from "react";

interface QAItem {
  question: string;
  answer: string;
}

const QAList: QAItem[] = [
  {
    question: "游客能使用哪些功能？",
    answer:
      "游客可以无需注册，快速编辑简历并下载为高质量PDF格式。但如果需要保存简历、后续编辑或分享简历，则需要注册账户。",
  },
  {
    question: "如何保存和管理我的简历？",
    answer:
      "注册后，你的简历将保存在云端，随时可以修改和更新。每次编辑都会自动保存，确保你的简历信息不丢失。",
  },
  {
    question: "如何将简历分享给招聘方？",
    answer:
      "一旦注册并保存简历，你将获得一个专属的在线简历链接。通过这个链接，你可以便捷地将简历分享给招聘方、朋友或同事。",
  },
  {
    question: "我可以导出简历为哪些格式？",
    answer:
      "目前，我们仅支持将简历导出为高质量PDF格式，确保排版规范、格式清晰，适合投递给任何雇主或公司。",
  },
  {
    question: "为什么需要注册才能保存和分享简历？",
    answer:
      "注册账户可以帮助我们安全地保存你的简历数据，让你随时可以访问和编辑。只有注册后，你才可以保存简历并生成可以分享的链接。",
  },
  {
    question: "本站是谁创建的？",
    answer:
      "本站由一名全栈开发者创建，旨在为求职者提供一个简便高效的简历编辑和分享平台。希望通过这个工具，帮助更多求职者提升求职效率，轻松展示自己的职业背景。",
  },
  {
    question: "为什么要选择这个简历编辑工具？",
    answer:
      "我们提供直观的简历编辑器、实时预览、多个模板选择以及PDF导出等功能，帮助你快速制作并分享简历。无论是新求职者还是职场老手，都能高效创建符合标准的专业简历。",
  },
];

export default function QASection() {
  return (
    <section className="questions-answers-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-center text-3xl font-bold text-gray-900 mb-12">
        常见问题
      </h2>
      <div className="space-y-4">
        {QAList.map((item, index) => (
          <div key={index}>
            <div className="py-4">
              <h3 className="font-bold text-lg text-gray-900">
                {item.question}
              </h3>
              <p className="text-gray-600 mt-2">{item.answer}</p>
            </div>
            {index < QAList.length - 1 && (
              <hr className="my-4 border-gray-200" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
