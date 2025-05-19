import React, { useState } from "react";
import Editor from "./Editor";
import { EducationInfo } from "@/app/store/resumeEdit";
type Props = {
  data: EducationInfo[];
  onChange: (index: number, field: keyof EducationInfo, value: any) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
};

const EducationInfoComponent = ({ data, onChange, onAdd, onRemove }: Props) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-neutral rounded-xl p-6 card-shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-dark flex items-center">
          <i className="fa-solid fa-graduation-cap text-primary mr-2"></i>
          教育信息
        </h2>
        <div className="flex space-x-2">
          <button
            className="text-primary hover:text-primary/80 transition-colors duration-200"
            onClick={toggleExpand}
          >
            <i
              className={
                isExpanded
                  ? "fa-solid fa-chevron-up"
                  : "fa-solid fa-chevron-down"
              }
            ></i>
          </button>
          <button
            className="text-green-600 hover:text-green-700 transition-colors duration-200"
            onClick={onAdd}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      {isExpanded && (
        <div id="education-container">
          {data.map((item, index) => (
            <div
              className="education-item space-y-4 mt-4 border-t pt-4"
              key={index}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    学校名称
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="请输入学校名称"
                    value={item.school}
                    onChange={(e) => onChange(index, "school", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    学历
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={item.degree}
                    onChange={(e) => onChange(index, "degree", e.target.value)}
                  >
                    <option value="">请选择学历</option>
                    <option value="专科">专科</option>
                    <option value="本科">本科</option>
                    <option value="硕士">硕士</option>
                    <option value="博士">博士</option>
                    <option value="其他">其他</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    专业
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="请输入专业"
                    value={item.major}
                    onChange={(e) => onChange(index, "major", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    时间
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="例如：2018.09-2022.06"
                    value={item.time}
                    onChange={(e) => onChange(index, "time", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  描述
                </label>
                {/* <Editor
                  value={item.description}
                  onChange={(value) => onChange(index, "description", value)}
                  placeholder="请输入描述内容"
                /> */}
              </div>

              <button
                className="text-red-500 hover:text-red-600 text-sm transition-colors duration-200"
                onClick={() => onRemove(index)}
              >
                <i className="fa-solid fa-trash"></i> 删除此项
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationInfoComponent;
