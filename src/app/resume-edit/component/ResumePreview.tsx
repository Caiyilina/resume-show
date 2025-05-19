import React from "react";
import { ResumeData } from "@/app/store/resumeEdit";

const ResumePreview = ({
  data,
  workYears,
}: {
  data: ResumeData;
  workYears: number;
}) => {
  const { basic, education, skills, experience, projects, settings } = data;

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

  // 计算技能进度条宽度
  const getSkillWidth = (level: number) => `${level * 20}%`;

  // 格式化日期
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return `${year}.${month.padStart(2, "0")}`;
  };

  // 获取工作时间范围
  const getExperienceTime = (item: {
    startDate?: string;
    endDate?: string;
    current?: boolean;
  }) => {
    const start = formatDate(item.startDate!);
    const end = item.current ? "至今" : formatDate(item.endDate!) || "至今";
    return `${start}-${end}`;
  };

  // 获取项目时间范围
  const getProjectTime = (item: {
    startDate?: string;
    endDate?: string;
    current?: boolean;
  }) => {
    const start = formatDate(item.startDate!);
    const end = item.current ? "至今" : formatDate(item.endDate!) || "至今";
    return `${start}-${end}`;
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-xl max-w-3xl mx-auto overflow-hidden transition-all duration-500 ${
        settings.layout === "modern" ? "border border-gray-200" : ""
      } ${settings.layout === "creative" ? "rounded-2xl" : ""}`}
      style={{
        fontFamily:
          settings.fontFamily === "inter"
            ? "Inter, sans-serif"
            : settings.fontFamily,
        fontSize: `${settings.fontSize}px`,
      }}
    >
      {/* 简历头部 */}
      <div className="p-6" style={{ backgroundColor: settings.themeColor }}>
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold mb-2 text-white">
          {basic.name || "张三"}
        </h2>
        <p className="text-white/90 mb-4">前端开发工程师</p>

        <div className="flex flex-wrap gap-4 text-sm text-white">
          <div className="flex items-center">
            <i className="fa-solid fa-phone mr-2"></i>
            <span>{basic.phone || "13800138000"}</span>
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-envelope mr-2"></i>
            <span>{basic.email || "example@mail.com"}</span>
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-graduation-cap mr-2"></i>
            <span>{basic.major || "计算机科学与技术"}</span>
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-briefcase mr-2"></i>
            <span>{workYears}年</span>
          </div>
        </div>
      </div>

      {/* 简历内容 */}
      <div className="p-6 space-y-6">
        {/* 教育经历 */}
        <div className="space-y-4">
          <h3
            className="text-lg font-semibold border-b border-gray-200 pb-2 flex items-center"
            style={{ color: settings.themeColor }}
          >
            <i className="fa-solid fa-graduation-cap mr-2"></i>教育经历
          </h3>

          <div className="space-y-2">
            {education.map((item, index) => (
              <div className="bg-gray-50 p-3 rounded-lg" key={index}>
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{item.school || "学校名称"}</h4>
                  <span className="text-sm text-gray-600">
                    {item.degree || "学历"} | {item.major || "专业"}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{item.time || "时间"}</p>
                <p className="text-sm mt-2">{item.description || "描述"}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 技能 */}
        <div className="space-y-4">
          <h3
            className="text-lg font-semibold border-b border-gray-200 pb-2 flex items-center"
            style={{ color: settings.themeColor }}
          >
            <i className="fa-solid fa-code mr-2"></i>专业技能
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {skills.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.name || "技能名称"}</span>
                  <span>{getSkillLevelText(item.level!)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: getSkillWidth(item.level!),
                      backgroundColor: settings.themeColor,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 工作经历 */}
        <div className="space-y-4">
          <h3
            className="text-lg font-semibold border-b border-gray-200 pb-2 flex items-center"
            style={{ color: settings.themeColor }}
          >
            <i className="fa-solid fa-briefcase mr-2"></i>工作经历
          </h3>

          <div className="space-y-4">
            {experience.map((item, index) => (
              <div className="bg-gray-50 p-3 rounded-lg" key={index}>
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{item.company || "公司名称"}</h4>
                  <span className="text-sm text-gray-600">
                    {item.position || "职位"}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {getExperienceTime(item)}
                </p>
                <ul className="text-sm mt-2 space-y-1 list-disc pl-5">
                  {item.description ? (
                    item.description
                      .split("；")
                      .map((line, i) => <li key={i}>{line.trim()}</li>)
                  ) : (
                    <li>工作描述内容...</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 项目经历 */}
        <div className="space-y-4">
          <h3
            className="text-lg font-semibold border-b border-gray-200 pb-2 flex items-center"
            style={{ color: settings.themeColor }}
          >
            <i className="fa-solid fa-project-diagram mr-2"></i>项目经历
          </h3>

          <div className="space-y-4">
            {projects.map((item, index) => (
              <div className="bg-gray-50 p-3 rounded-lg" key={index}>
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{item.name || "项目名称"}</h4>
                  <span className="text-sm text-gray-600">
                    {item.role || "角色"}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{getProjectTime(item)}</p>
                <ul className="text-sm mt-2 space-y-1 list-disc pl-5">
                  {item.description ? (
                    item.description
                      .split("；")
                      .map((line, i) => <li key={i}>{line.trim()}</li>)
                  ) : (
                    <li>项目描述内容...</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
