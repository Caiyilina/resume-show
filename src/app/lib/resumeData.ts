import { PrivacyConfig, ResumeData } from "./type";

export const resumeData: ResumeData = {
  personalInfo: {
    name: "张明",
    jobTitle: "前端开发工程师",
    intendedCity: "北京/上海/深圳",
    currentStatus: "在职，考虑机会",
    age: "28岁",
    phone: "13800138000",
    wechat: "demo_zhang",
    email: "demo@example.com",
    qrCode: "https://placehold.co/300x300?text=WeChat+QR",
  },
  selfEvaluation: [
    "5年前端开发经验，精通Vue技术栈，参与过多个大型企业级应用的开发和维护",
    "具备全栈开发能力，熟悉Node.js后端开发，有多个全栈项目经验",
    "对前端工程化有深入研究，熟悉webpack、vite等构建工具的配置和优化",
    "热爱开源，在GitHub上维护多个开源项目，积极参与技术社区讨论和分享",
  ],
  workExperience: [
    {
      period: "2021-03 ~ 至今",
      company: "科技创新有限公司",
      position: "高级前端开发工程师",
      responsibilities: [
        "负责公司核心业务系统的前端架构设计和开发工作",
        "主导团队前端技术栈升级，将传统Vue2项目迁移至Vue3 + TypeScript",
        "设计并实现企业级组件库，提升团队开发效率50%以上",
        "负责新人培训和技术分享，建立团队技术文档体系",
      ],
    },
    {
      period: "2018-07 ~ 2021-02",
      company: "互联网科技有限公司",
      position: "前端开发工程师",
      responsibilities: [
        "负责公司电商平台的PC端和移动端开发",
        "开发和维护公司内部组件库，提升开发效率",
        "参与前端工程化建设，制定代码规范和CI/CD流程",
      ],
    },
  ],
  projectExperience: [
    {
      name: "企业级中台管理系统",
      techStack: "Vue3、TypeScript、Element Plus、Vite",
      description:
        "一个现代化的企业级中台系统，集成了用户管理、权限控制、数据分析等多个核心功能模块。",
      responsibilities: [
        "负责项目整体技术架构设计和核心功能开发",
        "实现基于RBAC的权限管理系统",
        "设计并实现动态表单系统，支持复杂表单配置",
        "集成ECharts实现数据可视化功能",
        "优化项目性能，实现按需加载和代码分割",
      ],
    },
    {
      name: "电商平台小程序",
      techStack: "uni-app、Vue3、TypeScript",
      description: "跨平台电商小程序，支持微信、支付宝等多个平台。",
      responsibilities: [
        "负责小程序整体架构设计和开发",
        "实现商品展示、购物车、订单管理等核心功能",
        "封装通用组件，提高开发效率",
        "优化小程序性能，提升用户体验",
      ],
    },
  ],
  personalProjects: [
    {
      name: "Vue组件库",
      description:
        "一个基于Vue3的现代化UI组件库，包含30+常用组件，支持按需引入和主题定制。",
      url: "https://github.com/demo/vue-components",
      screenshots: [
        "https://placehold.co/800x400?text=Component+Demo+1",
        "https://placehold.co/800x400?text=Component+Demo+2",
      ],
    },
    {
      name: "在线Markdown编辑器",
      description: "基于Vue3开发的在线Markdown编辑器，支持实时预览和主题切换",
      url: "https://github.com/demo/markdown-editor",
      screenshots: [],
    },
  ],
  education: [
    {
      period: "2014-09 ~ 2018-06",
      school: "示例大学",
      major: "计算机科学与技术（本科）",
      verificationCode: "DEMO123456",
      verificationUrl: "https://www.chsi.com.cn/xlcx/bgcx.jsp",
    },
  ],
};

export const privacyConfig: PrivacyConfig = {
  password: "demo123",
  maskText: {
    name: {
      authenticated: "真实姓名",
      unauthenticated: "demo_username",
    },
  },
};

export const PRIVACY_PASSWORD = privacyConfig.password;
