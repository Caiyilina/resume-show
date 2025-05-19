import React, { useState } from "react";
import { ResumeSettings } from "@/app/store/resumeEdit";

type Props = {
  data: ResumeSettings;
  onChange: (field: keyof ResumeSettings, value: any) => void;
};

const ResumeSettingsComponent = ({ data, onChange }: Props) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleThemeColorChange = (color: string) => {
    onChange("themeColor", color);
  };

  const handleLayoutChange = (layout: string) => {
    onChange("layout", layout);
  };

  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange("fontFamily", e.target.value);
  };

  const handleFontSizeChange = (size: string) => {
    onChange("fontSize", parseInt(size));
  };

  return (
    <div className="bg-neutral rounded-xl p-6 card-shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-dark flex items-center">
          <i className="fa-solid fa-sliders text-primary mr-2"></i>简历设置
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
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              主题颜色
            </label>
            <div className="flex space-x-2 flex-wrap">
              <button
                className={`w-8 h-8 rounded-full bg-blue-600 ${
                  data.themeColor === "#165DFF"
                    ? "ring-2 ring-offset-2 ring-primary"
                    : ""
                }`}
                onClick={() => handleThemeColorChange("#165DFF")}
              ></button>
              <button
                className={`w-8 h-8 rounded-full bg-red-600 ${
                  data.themeColor === "#EF4444"
                    ? "ring-2 ring-offset-2 ring-primary"
                    : ""
                }`}
                onClick={() => handleThemeColorChange("#EF4444")}
              ></button>
              <button
                className={`w-8 h-8 rounded-full bg-green-600 ${
                  data.themeColor === "#10B981"
                    ? "ring-2 ring-offset-2 ring-primary"
                    : ""
                }`}
                onClick={() => handleThemeColorChange("#10B981")}
              ></button>
              <button
                className={`w-8 h-8 rounded-full bg-purple-600 ${
                  data.themeColor === "#8B5CF6"
                    ? "ring-2 ring-offset-2 ring-primary"
                    : ""
                }`}
                onClick={() => handleThemeColorChange("#8B5CF6")}
              ></button>
              <button
                className={`w-8 h-8 rounded-full bg-amber-600 ${
                  data.themeColor === "#D97706"
                    ? "ring-2 ring-offset-2 ring-primary"
                    : ""
                }`}
                onClick={() => handleThemeColorChange("#D97706")}
              ></button>
              <button
                className={`w-8 h-8 rounded-full bg-gray-700 ${
                  data.themeColor === "#374151"
                    ? "ring-2 ring-offset-2 ring-primary"
                    : ""
                }`}
                onClick={() => handleThemeColorChange("#374151")}
              ></button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              字体
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={data.fontFamily}
              onChange={handleFontFamilyChange}
            >
              <option value="inter">Inter</option>
              <option value="roboto">Roboto</option>
              <option value="sans-serif">Sans-serif</option>
              <option value="serif">Serif</option>
              <option value="monospace">Monospace</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              字体大小
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="12"
                max="20"
                step="1"
                value={data.fontSize}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                onChange={(e) => handleFontSizeChange(e.target.value)}
              />
              <span className="text-sm text-gray-600">{data.fontSize}px</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              简历模板
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                className={`border-2 rounded-lg p-2 ${
                  data.layout === "classic"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-primary/50"
                }`}
                onClick={() => handleLayoutChange("classic")}
              >
                <div className="w-full h-20 bg-gray-100 rounded relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-6 bg-primary"></div>
                  <div className="absolute top-8 left-2 w-1/3 h-3 bg-gray-300 rounded"></div>
                  <div className="absolute top-12 left-2 w-2/3 h-2 bg-gray-300 rounded"></div>
                  <div className="absolute top-15 left-2 w-1/2 h-2 bg-gray-300 rounded"></div>
                </div>
                <p className="text-xs text-center mt-1">经典</p>
              </button>

              <button
                className={`border-2 rounded-lg p-2 ${
                  data.layout === "modern"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-primary/50"
                }`}
                onClick={() => handleLayoutChange("modern")}
              >
                <div className="w-full h-20 bg-gray-100 rounded relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1/4 h-full bg-primary"></div>
                  <div className="absolute top-2 left-1/4 w-2/3 h-3 bg-gray-300 rounded ml-2"></div>
                  <div className="absolute top-6 left-1/4 w-1/3 h-2 bg-gray-300 rounded ml-2"></div>
                  <div className="absolute top-10 left-1/4 w-2/3 h-2 bg-gray-300 rounded ml-2"></div>
                  <div className="absolute top-14 left-1/4 w-1/2 h-2 bg-gray-300 rounded ml-2"></div>
                </div>
                <p className="text-xs text-center mt-1">现代</p>
              </button>

              <button
                className={`border-2 rounded-lg p-2 ${
                  data.layout === "creative"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-primary/50"
                }`}
                onClick={() => handleLayoutChange("creative")}
              >
                <div className="w-full h-20 bg-gray-100 rounded-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-8 bg-primary rounded-b-lg"></div>
                  <div className="absolute top-10 left-2 w-1/3 h-3 bg-gray-300 rounded"></div>
                  <div className="absolute top-14 left-2 w-2/3 h-2 bg-gray-300 rounded"></div>
                </div>
                <p className="text-xs text-center mt-1">创意</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeSettingsComponent;
