"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import useResumeStore from "@/app/store/resume";
import {
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  WrenchIcon,
  CodeBracketIcon,
  CircleStackIcon,
  LinkIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import "@ant-design/v5-patch-for-react-19";
import { SectionCard } from "@/app/component/ResumeUI";
import { Input, message, Modal, Tooltip } from "antd";
// import html2canvas from "html2canvas";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

export default function ResumeDemoPage() {
  const { resumeData, error, fetchResumeData } = useResumeStore();
  const [isAuth, setIsAuth] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  // 是否展示对话框 输入密码
  const [showModal, setShowModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputPwd, setInputPwd] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    fetchResumeData();
    console.log("获取简历", resumeData);
  }, []);
  useEffect(() => {
    console.log("监听isAuth", isAuth, confirmLoading);
    if (!confirmLoading && !isAuth) return;
    if (isAuth) {
      console.log("验证成功message");

      messageApi.success({
        content: "验证成功",
        key: "auth",
      });
      setShowModal(false);
      setConfirmLoading(false);
      setInputPwd("");
    } else {
      console.log("验证失败message");
      messageApi.error({
        content: "验证失败",
        key: "auth",
      });
      setConfirmLoading(false);
    }
  }, [isAuth, confirmLoading, messageApi]);
  const handleOk = async () => {
    setConfirmLoading(true);
    const res = await fetchResumeData(inputPwd);
    console.log("验证结果--", res);
    setIsAuth(() => res?.isAuthenticated || false);
  };
  const handleCancel = () => {
    console.log("取消验证");
    setShowModal(false);
    setConfirmLoading(false);
  };

  const handleExportPDF = useCallback(async () => {
    const resumeContainer = resumeRef.current;
    const privacySection = document.querySelector(
      "#privacy-section"
    ) as HTMLElement;
    const originalDisplay = privacySection?.style?.display;
    try {
      if (resumeContainer && privacySection) {
        privacySection.style.display = "none";

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: "a4",
        });
        // 获取页面尺寸并设置较小的边距
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 10; // 减小边距

        // 计算实际内容区域
        const contentWidth = pageWidth - 2 * margin;
        const contentHeight = pageHeight - 2 * margin;
        const canvas = await html2canvas(resumeContainer, {
          allowTaint: true,
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
        });
        // 获取canvas尺寸
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        // 计算缩放比例，增加填充比例
        const scale = Math.min(
          (contentWidth / canvasWidth) * 1.3, // 增加30%的填充比例
          (contentHeight / canvasHeight) * 1.3
        );
        // 计算居中位置
        const x = margin;
        const y = margin;
        const imgData = canvas.toDataURL("image/png", 1.0);

        pdf.addImage(
          imgData,
          "JPEG",
          x,
          y,
          canvasWidth * scale,
          canvasHeight * scale
        );
        pdf.save(`${resumeData?.personalInfo?.name || "简历"}.pdf`);
        console.log("originalDisplay", originalDisplay);

        privacySection.style.display = originalDisplay;
      }
    } catch (error) {
      console.error("导出失败", error);
    } finally {
      privacySection.style.display = originalDisplay;
    }
  }, []);
  return (
    <>
      {contextHolder}
      <div ref={resumeRef} className="min-h-screen bg-gray-50 p-8">
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
                    <LinkIcon className="h-5 w-5" />
                    <span>{resumeData?.personalInfo?.siteUrl}</span>
                  </div>
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
                    {/* 微信二维码 */}
                    <Tooltip
                      color="#fff"
                      title={
                        <div className="relative group">
                          <img
                            src={
                              resumeData?.personalInfo.qrCode ||
                              "/public/vercel.svg"
                            }
                            alt="微信二维码"
                            className="w-32 h-32 rounded-lg border-2 border-blue-100 transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-20 transition-opacity rounded-lg" />
                        </div>
                      }
                    >
                      <span className="block cursor-pointer">
                        <QrCodeIcon className="h-5 w-5 text-blue-500" />
                      </span>
                    </Tooltip>
                  </div>
                </div>
                <div
                  id="privacy-section"
                  className="flex flex-col md:flex-row items-stretch md:items-center  justify-center w-full md:w-auto gap-1 md:gap-2"
                >
                  <button
                    onClick={() => {
                      setShowModal(true);
                    }}
                    className="h-10 px-4 py-2  bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    查看完整信息
                  </button>
                  <button
                    onClick={handleExportPDF}
                    className="h-10 px-4 py-2  bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    导出PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 主体内容容器 */}
        <div className="mx-auto mt-8 max-w-4xl grid gap-6">
          {/* 技能优势 */}
          <SectionCard title="技能优势" icon={<CircleStackIcon />}>
            <ul className="list-disc space-y-1 pl-6 text-gray-700">
              {resumeData?.skillAdvantage?.map((skillItem, index) => (
                <li key={index}>{skillItem}</li>
              ))}
            </ul>
          </SectionCard>
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
      <Modal
        open={showModal}
        title="请输入密码查看完整信息"
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        <Input.Password
          type="password"
          value={inputPwd}
          placeholder="请输入密码"
          onChange={(e) => {
            setInputPwd(e.target.value);
          }}
        />
      </Modal>
    </>
  );
}
