import { create } from "zustand";

// 定义简历数据类型
export interface ResumeData {
  basic: BasicInfo;
  education: EducationInfo[];
  skills: SkillInfo[];
  experience: ExperienceInfo[];
  projects: ProjectInfo[];
  settings: ResumeSettings;
}

// 基本信息类型
export interface BasicInfo {
  name?: string;
  gender?: string;
  workStart?: string;
  major?: string;
  phone?: string;
  email?: string;
}

// 教育信息类型
export interface EducationInfo {
  school?: string;
  degree?: string;
  major?: string;
  time?: string;
  description?: string;
}

// 技能信息类型
export interface SkillInfo {
  name?: string;
  level?: number;
}

// 工作经历类型
export interface ExperienceInfo {
  company?: string;
  position?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

// 项目经历类型
export interface ProjectInfo {
  name?: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

// 简历设置类型
export interface ResumeSettings {
  themeColor?: string;
  fontFamily?: string;
  fontSize?: number;
  layout?: string;
}

// 定义状态库的状态和动作
interface ResumeEditStore {
  resumeData: ResumeData;
  setResumeData: (newData: Partial<ResumeData>) => void;
  updateBasicInfo: (field: keyof BasicInfo, value: any) => void;
  updateEducationInfo: (
    index: number,
    field: keyof EducationInfo,
    value: any
  ) => void;
  addEducation: () => void;
  removeEducation: (index: number) => void;
  updateSkillInfo: (index: number, field: keyof SkillInfo, value: any) => void;
  addSkillInfo: () => void;
  removeSkillInfo: (index: number) => void;
  updateExperience: (
    index: number,
    field: keyof ExperienceInfo,
    value: any
  ) => void;
  addExperience: () => void;
  removeExperience: (index: number) => void;
  updateProject: (index: number, field: keyof ProjectInfo, value: any) => void;
  addProject: () => void;
  removeProject: (index: number) => void;
  updateSetting: (field: keyof ResumeSettings, value: any) => void;

  exportResume: () => void;
}

// 初始状态
const initialState: ResumeData = {
  basic: {
    name: "张三",
    gender: "",
    workStart: "",
    major: "计算机科学与技术",
    phone: "13800138000",
    email: "example@mail.com",
  },
  education: [
    {
      school: "北京大学",
      degree: "本科",
      major: "计算机科学与技术",
      time: "2018.09-2022.06",
      description:
        "主修课程：数据结构、算法分析、计算机网络、操作系统、编程语言（C++/Java/Python）",
    },
  ],
  skills: [
    { name: "JavaScript/TypeScript", level: 4 },
    { name: "React/Next.js", level: 4 },
    { name: "Vue.js", level: 3 },
    { name: "HTML/CSS", level: 5 },
    { name: "Webpack/Vite", level: 3 },
    { name: "Node.js", level: 2 },
  ],
  experience: [
    {
      company: "XX科技有限公司",
      position: "前端开发工程师",
      startDate: "2022-07",
      endDate: "",
      current: true,
      description:
        "负责公司核心产品的前端开发工作，使用React技术栈构建用户界面；参与前端架构设计，优化前端工程化流程，提升团队开发效率；主导完成多个大型项目的开发，包括电商平台、管理后台等；负责前端性能优化，页面加载速度提升40%，用户体验显著改善",
    },
  ],
  projects: [
    {
      name: "智能简历生成器",
      role: "前端负责人",
      startDate: "2023-03",
      endDate: "",
      current: true,
      description:
        "设计并实现简历生成器的前端界面，支持多种模板和自定义配置；使用React hooks和TypeScript开发，确保代码质量和可维护性；实现简历实时预览和PDF导出功能，提升用户体验；参与前后端接口设计，优化数据交互流程",
    },
  ],
  settings: {
    themeColor: "#165DFF",
    fontFamily: "inter",
    fontSize: 16,
    layout: "classic",
  },
};

// 创建状态库
export const useResumeEditStore = create<ResumeEditStore>((set) => ({
  resumeData: initialState,

  // 更新整个简历数据
  setResumeData: (newData) =>
    set((state) => ({
      resumeData: { ...state.resumeData, ...newData },
    })),

  // 更新基本信息
  updateBasicInfo: (field, value) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        basic: {
          ...state.resumeData.basic,
          [field]: value,
        },
      },
    })),

  // 更新教育信息
  updateEducationInfo: (index, field, value) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    })),

  // 添加教育经历
  addEducation: () =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: [
          ...state.resumeData.education,
          {
            school: "",
            degree: "",
            major: "",
            time: "",
            description: "",
          },
        ],
      },
    })),

  // 删除教育经历
  removeEducation: (index) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.filter((_, i) => i !== index),
      },
    })),

  updateSkillInfo: (index, field, value) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: state.resumeData.skills.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    })),
  addSkillInfo: () =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: [...state.resumeData.skills, { name: "", level: 0 }],
      },
    })),

  removeSkillInfo: (index) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: state.resumeData.skills.filter((_, i) => i !== index),
      },
    })),
  updateExperience: (index, field, value) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: state.resumeData.experience.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    })),
  addExperience: () =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: [
          ...state.resumeData.experience,
          {
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
          },
        ],
      },
    })),

  removeExperience: (index) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: state.resumeData.experience.filter((_, i) => i !== index),
      },
    })),
  updateProject: (index, field, value) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    })),
  addProject: () =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: [
          ...state.resumeData.projects,
          {
            name: "",
            role: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
          },
        ],
      },
    })),

  removeProject: (index) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.filter((_, i) => i !== index),
      },
    })),

  // 更新设置
  updateSetting: (field, value) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        settings: {
          ...state.resumeData.settings,
          [field]: value,
        },
      },
    })),

  // 导出简历
  exportResume: () => {
    const { resumeData } = useResumeEditStore.getState();
    const blob = new Blob([JSON.stringify(resumeData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },
}));
