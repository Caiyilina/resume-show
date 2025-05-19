import React, { useState } from "react";
import { SkillInfo } from "@/app/store/resumeEdit";

type Props = {
  data: SkillInfo[];
  onChange: (index: number, field: keyof SkillInfo, value: any) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
};

const SkillsInfoComponent = ({ data, onChange, onAdd, onRemove }: Props) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // 计算技能水平文本
  const getSkillLevelText = (level: number) => {
    switch (level) {
      case 1:
        return "入门";
      case 2:
        return "初级";
      case 3:
        return "中等";
      case 4:
        return "高级";
      case 5:
        return "专家";
      default:
        return "中等";
    }
  };

  return (
    <div className="bg-neutral rounded-xl p-6 card-shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-dark flex items-center">
          <i className="fa-solid fa-code text-primary mr-2"></i>技能信息
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
        <div id="skills-container">
          {data.map((item, index) => (
            <div
              className="skill-item space-y-4 mt-4 border-t pt-4"
              key={index}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    技能名称
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="请输入技能名称"
                    value={item.name}
                    onChange={(e) => onChange(index, "name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    熟练程度
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={item.level}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                      onChange={(e) =>
                        onChange(index, "level", parseInt(e.target.value))
                      }
                    />
                    <span className="text-sm text-gray-600">
                      {getSkillLevelText(item.level!)}
                    </span>
                  </div>
                </div>
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

export default SkillsInfoComponent;
