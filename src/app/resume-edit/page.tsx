"use client";

import { useEffect, useState } from "react";
import { useResumeEditStore } from "../store/resumeEdit";
import ResumePreview from "./component/ResumePreview";

export default function Page() {
  const {
    resumeData,
    setResumeData,
    updateBasicInfo,
    updateEducationInfo,
    addEducation,
    removeEducation,
    updateSkillInfo,
    addSkillInfo,
    removeSkillInfo,
    updateExperience,
    addExperience,
    removeExperience,
    updateProject,
    addProject,
    removeProject,
    updateSetting,
    exportResume,
  } = useResumeEditStore();
  const [workYears, setWorkYears] = useState(0);

  // 计算工作年限
  useEffect(() => {
    if (resumeData.basic.workStart) {
      const startDate = new Date(resumeData.basic.workStart);
      const now = new Date();
      let years = now.getFullYear() - startDate.getFullYear();
      const monthDiff = now.getMonth() - startDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && now.getDate() < startDate.getDate())
      ) {
        years--;
      }

      setWorkYears(years);
    }
  }, [resumeData.basic.workStart]);
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* 左侧编辑区域 */}
      <div className="w-full md:w-1/2 bg-white p-4 md:p-8 overflow-y-auto scrollbar-hide">
        <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-dark mb-6">
          简历编辑
        </h1>

        <div className="space-y-8 max-w-4xl mx-auto">
          <BasicInfo
            data={resumeData.basic}
            onChange={updateBasicInfo}
            workYears={workYears}
          />

          <EducationInfo
            data={resumeData.education}
            onChange={updateEducationInfo}
            onAdd={addEducation}
            onRemove={removeEducation}
          />

          <SkillsInfo
            data={resumeData.skills}
            onChange={/* 获取技能更新方法 */}
            onAdd={/* 获取添加技能方法 */}
            onRemove={/* 获取删除技能方法 */}
          />

          <ExperienceInfo
            data={resumeData.experience}
            onChange={/* 获取工作经历更新方法 */}
            onAdd={/* 获取添加工作经历方法 */}
            onRemove={/* 获取删除工作经历方法 */}
          />

          <ProjectInfo
            data={resumeData.projects}
            onChange={/* 获取项目更新方法 */}
            onAdd={/* 获取添加项目方法 */}
            onRemove={/* 获取删除项目方法 */}
          />

          <ResumeSettings
            data={resumeData.settings}
            onChange={/* 获取设置更新方法 */}
          />

          {/* 操作按钮 */}
          <div className="flex justify-between py-4">
            <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center">
              <i className="fa-solid fa-download mr-2"></i>下载PDF
            </button>
            <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 flex items-center">
              <i className="fa-solid fa-share-alt mr-2"></i>分享简历
            </button>
          </div>
        </div>
      </div>

      {/* 右侧预览区域 */}
      <div className="w-full md:w-1/2 bg-gray-100 p-4 md:p-8 overflow-y-auto scrollbar-hide">
        <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-dark mb-6">
          简历预览
        </h1>
        <ResumePreview data={resumeData} workYears={workYears} />
      </div>
    </div>
  );
}
