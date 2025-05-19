import React, { useState } from "react";
import { BasicInfo } from "@/app/store/resumeEdit";

type Props = {
  data: BasicInfo;
  onChange: (field: keyof BasicInfo, value: any) => void;
  workYears: number;
};

const BasicInfoComponent = ({ data, onChange, workYears }: Props) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-neutral rounded-xl p-6 card-shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-dark flex items-center">
          <i className="fa-solid fa-user-circle text-primary mr-2"></i>基础信息
        </h2>
        <button
          className="text-primary hover:text-primary/80 transition-colors duration-200"
          onClick={toggleExpand}
        >
          <i
            className={
              isExpanded ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"
            }
          ></i>
        </button>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              姓名
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="请输入姓名"
              value={data.name}
              onChange={(e) => onChange("name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              性别
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={data.gender}
              onChange={(e) => onChange("gender", e.target.value)}
            >
              <option value="">请选择性别</option>
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              工作年限
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={data.workStart}
                onChange={(e) => onChange("workStart", e.target.value)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {workYears}年
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              专业
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="请输入专业"
              value={data.major}
              onChange={(e) => onChange("major", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              电话
            </label>
            <input
              type="tel"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="请输入电话号码"
              value={data.phone}
              onChange={(e) => onChange("phone", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              邮箱
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="请输入邮箱"
              value={data.email}
              onChange={(e) => onChange("email", e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicInfoComponent;
