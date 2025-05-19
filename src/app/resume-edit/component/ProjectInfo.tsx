import React, { useState } from "react";
import Editor from "./Editor";
import { ProjectInfo } from "@/app/store/resumeEdit";

type Props = {
  data: ProjectInfo[];
  onChange: (index: number, field: keyof ProjectInfo, value: any) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
};

const ProjectInfo = ({ data, onChange, onAdd, onRemove }: Props) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-neutral rounded-xl p-6 card-shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-dark flex items-center">
          <i className="fa-solid fa-project-diagram text-primary mr-2"></i>
          项目经历
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
        <div id="project-container">
          {data.map((item, index) => (
            <div
              className="project-item space-y-4 mt-4 border-t pt-4"
              key={index}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    项目名称
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="请输入项目名称"
                    value={item.name}
                    onChange={(e) => onChange(index, "name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    角色
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="请输入您的角色"
                    value={item.role}
                    onChange={(e) => onChange(index, "role", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    开始时间
                  </label>
                  <input
                    type="month"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={item.startDate}
                    onChange={(e) =>
                      onChange(index, "startDate", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    结束时间
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="month"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      value={item.endDate}
                      onChange={(e) =>
                        onChange(index, "endDate", e.target.value)
                      }
                      disabled={item.current}
                    />
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                        checked={item.current}
                        onChange={(e) =>
                          onChange(index, "current", e.target.checked)
                        }
                      />
                      <span className="ml-2 text-sm text-gray-700">至今</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  项目描述
                </label>
                {/* <Editor
                  value={item.description}
                  onChange={(value) => onChange(index, "description", value)}
                  placeholder="请输入项目描述内容"
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

export default ProjectInfo;
