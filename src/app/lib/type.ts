/**
 * 简历核心数据结构
 * @description 包含求职者的完整履历信息，用于生成可视化简历页面
 */
interface ResumeData {
  /**
   * 个人信息部分
   * @description 包含基本身份信息和联系方式
   */
  personalInfo: {
    /** @description 姓名（需隐私保护处理） */
    name?: string;
    /** @description 求职职位 */
    jobTitle?: string;
    /** @description 意向工作城市 */
    intendedCity?: string;
    /** @description 当前求职状态（例如：在职看机会） */
    currentStatus?: string;
    /** @description 年龄显示（格式：28岁） */
    age?: string;
    /** @description 联系电话（需隐私保护处理） */
    phone?: string;
    /** @description 微信号（需隐私保护处理） */
    wechat?: string;
    /** @description 电子邮箱（需隐私保护处理） */
    email?: string;
    /** @description 微信二维码图片URL */
    qrCode?: string;
  };
  /**
   * 技能优势
   * @description 技能优势信息列表
   */
  skillAdvantage?: string[];
  /**
   * 自我评价
   * @description 展示个人优势和特点的陈述列表
   */
  selfEvaluation?: string[];

  /**
   * 工作经历
   * @description 按时间倒序排列的职业经历
   */
  workExperience?: Array<{
    /** @description 工作时间段（格式：YYYY-MM ~ YYYY-MM） */
    period?: string;
    /** @description 公司名称 */
    company?: string;
    /** @description 职位名称 */
    position?: string;
    /** @description 工作职责和成就列表 */
    responsibilities?: string[];
  }>;

  /**
   * 项目经验
   * @description 参与的重要项目经历
   */
  projectExperience?: Array<{
    /** @description 项目名称 */
    name?: string;
    /** @description 主要技术栈 */
    techStack?: string;
    /** @description 项目简要描述 */
    description?: string;
    /** @description 个人在项目中的职责 */
    responsibilities?: string[];
  }>;

  /**
   * 个人项目
   * @description 自主开发或参与的开源项目
   */
  personalProjects?: Array<{
    /** @description 项目名称 */
    name?: string;
    /** @description 项目详细描述 */
    description?: string;
    /** @description 项目演示或代码仓库URL */
    url?: string;
    /** @description 项目截图URL列表 */
    screenshots?: string[];
  }>;

  /**
   * 教育背景
   * @description 学历教育经历
   */
  education?: Array<{
    /** @description 教育时间段（格式：YYYY-MM ~ YYYY-MM） */
    period?: string;
    /** @description 学校名称 */
    school?: string;
    /** @description 所学专业 */
    major?: string;
    /** @description 学信网验证码 */
    verificationCode?: string;
    /** @description 学信网验证链接 */
    verificationUrl?: string;
  }>;
}

/**
 * 隐私保护配置结构
 * @description 控制敏感信息的显示方式和访问权限
 */
interface PrivacyConfig {
  /** @description 隐私查看密码（MD5加密存储） */
  password?: string;

  /**
   * 字段掩码配置
   * @description 控制各字段在不同认证状态下的显示方式
   */
  maskText?: {
    /**
     * 姓名掩码配置
     * @description 控制姓名显示的不同状态
     */
    name?: {
      /** @description 已认证状态下显示的姓名 */
      authenticated?: string;
      /** @description 未认证状态下显示的掩码名称 */
      unauthenticated?: string;
    };
    /**
     * 公司掩码配置
     * @description 控制公司显示的不同状态
     */
    company: {
      /** @description 已认证状态下显示的公司 */
      authenticated?: string;
      /** @description 未认证状态下显示的掩码名称 */
      unauthenticated?: string;
    };
    school: {
      /** @description 已认证状态下显示 */
      authenticated?: string;
      /** @description 未认证状态下显示的掩码名称 */
      unauthenticated?: string;
    };
  };
}
export type { ResumeData, PrivacyConfig };
