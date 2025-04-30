CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
-- 用户表
CREATE TABLE users (
   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(50) NOT NULL COMMENT '用户名',
    email VARCHAR(100) NOT NULL UNIQUE COMMENT '邮箱',
    password CHAR(60) NOT NULL COMMENT '密码哈希',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 
-- 主简历表
CREATE TABLE resumes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL AFTER id,
    name VARCHAR(100) COMMENT '姓名',
    job_title VARCHAR(100) COMMENT '求职职位',
    intended_city VARCHAR(50) COMMENT '意向城市',
    current_status VARCHAR(50) COMMENT '当前状态',
    age VARCHAR(10) COMMENT '年龄',
    phone VARCHAR(20) COMMENT '联系电话',
    wechat VARCHAR(50) COMMENT '微信号',
    email VARCHAR(100) COMMENT '邮箱',
    qr_code VARCHAR(255) COMMENT '微信二维码',
    site_url VARCHAR(100) COMMENT '个人站点'
    skill_advantage JSON COMMENT '技能优势',
    self_evaluation JSON COMMENT '自我评价',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 工作经历表
CREATE TABLE work_experience (
    id INT PRIMARY KEY AUTO_INCREMENT,
    resume_id INT NOT NULL,
    period VARCHAR(20) COMMENT '工作时间',
    company VARCHAR(100) COMMENT '公司名称',
    position VARCHAR(100) COMMENT '职位名称',
    responsibilities JSON COMMENT '工作职责',
    FOREIGN KEY (resume_id) REFERENCES resumes(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 项目经验表
CREATE TABLE project_experience (
    id INT PRIMARY KEY AUTO_INCREMENT,
    resume_id INT NOT NULL,
    name VARCHAR(100) COMMENT '项目名称',
    tech_stack VARCHAR(200) COMMENT '技术栈',
    description TEXT COMMENT '项目描述',
    responsibilities JSON COMMENT '项目职责',
    FOREIGN KEY (resume_id) REFERENCES resumes(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 教育背景表
CREATE TABLE education (
    id INT PRIMARY KEY AUTO_INCREMENT,
    resume_id INT NOT NULL,
    period VARCHAR(20) COMMENT '教育时间',
    school VARCHAR(100) COMMENT '学校名称',
    major VARCHAR(100) COMMENT '所学专业',
    verification_code VARCHAR(50) COMMENT '学信网验证码',
    verification_url VARCHAR(255) COMMENT '验证链接',
    FOREIGN KEY (resume_id) REFERENCES resumes(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 隐私配置表
CREATE TABLE privacy_configs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    resume_id INT NOT NULL UNIQUE,
    password CHAR(32) COMMENT 'MD5加密密码',
    mask_text JSON COMMENT '字段掩码配置',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (resume_id) REFERENCES resumes(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



-- 创建索引
CREATE INDEX idx_resumes_name ON resumes(name);
CREATE INDEX idx_work_company ON work_experience(company);
CREATE INDEX idx_education_school ON education(school);
CREATE INDEX idx_resumes_user ON resumes(user_id);