"use client";
import { useEffect, useState } from "react";
import useResumeStore from "../store/resume";
import {
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  WrenchIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";
import { SectionCard } from "../component/ResumeUI";

export default function ResumePage() {
  const { resumeData, isAuth, error, fetchResumeData } = useResumeStore();
  const [showQrCode, setShowQrCode] = useState(false);
  useEffect(() => {
    fetchResumeData();
    console.log("获取简历", resumeData);
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* 顶部个人信息区域 */}
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">
              {resumeData?.personalInfo?.name}
            </h1>
            <p className="text-base md:text-lg text-blue-600 leading-tight">
              {resumeData?.personalInfo?.jobTitle}
            </p>
            <div className="flex space-x-4 text-gray-600">
              <span>{resumeData?.personalInfo?.age}</span>
              <span>{resumeData?.personalInfo?.intendedCity}</span>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col md:items-end">
            <div className="w-full md:w-auto space-y-2">
              <div className="w-full md:w-auto space-y-2">
                <div className="flex items-center space-x-2 text-gray-600">
                  <PhoneIcon className="h-5 w-5" />
                  <span>{resumeData?.personalInfo?.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <EnvelopeIcon className="h-5 w-5" />
                  <span>{resumeData?.personalInfo?.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <ChatBubbleLeftRightIcon className="h-5 w-5" />
                  <span>{resumeData?.personalInfo?.wechat}</span>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 w-full md:w-auto">
                <button
                  onClick={() => setShowQrCode(!showQrCode)}
                  className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {showQrCode ? "隐藏联系方式" : "查看完整信息"}
                </button>
                {showQrCode && (
                  <div className="relative group">
                    <img
                      src={resumeData?.personalInfo?.qrCode}
                      alt="微信二维码"
                      className="w-32 h-32 rounded-lg border-2 border-blue-100 transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-20 transition-opacity rounded-lg" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 主体内容容器 */}
      <div className="mx-auto mt-8 max-w-4xl grid gap-6">
        {/* 工作经历模块 */}
        <SectionCard title="工作经历" icon={<WrenchIcon />}>
          {resumeData?.workExperience?.map((exp, index) => (
            <div key={index} className="space-y-2   pl-4">
              <h3 className="text-lg md:text-xl font-semibold text-black  border-l-2 border-blue-400 pl-2">
                {exp.company}
              </h3>
              <div className="text-gray-600 flex flex-col md:flex-row md:items-center md:gap-2">
                <span>{exp.position}</span>
                <span className="text-gray-500">{exp.period}</span>
              </div>
              <ul className="list-disc space-y-1 pl-6 text-gray-700">
                {exp.responsibilities?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </SectionCard>

        {/* 项目经验模块 */}
        <SectionCard title="项目经验" icon={<CodeBracketIcon />}>
          {resumeData?.projectExperience?.map((project, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800  border-l-2 border-blue-400 pl-2">
                {project.name}
              </h3>
              <p className="text-gray-600">{project.techStack}</p>
              <p className="text-gray-700">{project.description}</p>
              <ul className="list-disc space-y-1 pl-6 text-gray-700">
                {project.responsibilities?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </SectionCard>
      </div>
    </div>
  );
}
