import bcrypt from "bcrypt";
import postgres from "postgres";
import {
  education,
  personalProjects,
  privacyConfig,
  projectExperience,
  resumes,
  selfEvaluation,
  skillAdvantage,
  users,
  workExperience,
} from "./mockdata";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });
async function setSessionTimezone() {
  try {
    // 列出数据库支持的所有时区
    const timezones = await sql`SELECT * FROM pg_timezone_names`;
    console.log("数据库支持的时区列表:", timezones);
    // 设置会话时区为北京时间
    await sql`SET TIMEZONE 'Asia/Hong_Kong'`;

    // 查询当前时间以验证时区设置
    const currentTime = await sql`SELECT NOW()`;
    console.log("当前2会话时区的时间:", currentTime[0].now);
  } catch (error) {
    console.error("设置时区时出错:", error);
  }
}

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE ,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
          INSERT INTO users (id, username, email, password)
          VALUES (${user.id}, ${user.username}, ${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
    })
  );

  return insertedUsers;
}
async function seedResumes() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
      CREATE TABLE IF NOT EXISTS resumes (
      id SERIAL PRIMARY KEY,
      user_id UUID NOT NULL,
      name VARCHAR(100) ,
      job_title VARCHAR(100) ,
      intended_city VARCHAR(50) ,
      current_status VARCHAR(50) ,
      age VARCHAR(10),
      phone VARCHAR(20) ,
      wechat VARCHAR(50) ,
      email VARCHAR(100) ,
      qr_code VARCHAR(255) ,
      site_url VARCHAR(100),
      skill_advantage JSON,
      self_evaluation JSON ,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `;
  // 检查索引是否存在
  const indexExists = await sql`
      SELECT indexname 
      FROM pg_indexes 
      WHERE tablename = 'resumes' AND indexname = 'idx_resumes_user_id';
      `;

  if (indexExists.length === 0) {
    // 若索引不存在，则创建索引
    await sql`CREATE INDEX idx_resumes_user_id ON resumes (user_id);`;
  }
  const insertedResumes = await Promise.all(
    resumes.map(async (resume) => {
      // 确保user_id存在于users表中
      const user = await sql`SELECT id FROM users WHERE id = ${resume.user_id}`;
      if (user.length === 0) {
        throw new Error(`User with id ${resume.user_id} not found`);
      }
      const searchRes =
        await sql`SELECT id FROM resumes WHERE id = ${resume.id}`;
      if (searchRes.length > 0) {
        return sql`
            UPDATE resumes
            SET 
              user_id=${resume.user_id},
              name=${resume.name},
              job_title=${resume.jobTitle},
              intended_city=${resume.intendedCity},
              current_status=${resume.currentStatus},
              age=${resume.age},
              phone=${resume.phone},
              wechat=${resume.wechat},
              email=${resume.email},
              qr_code=${resume.qrCode},
              site_url=${resume.siteUrl},
              skill_advantage=${JSON.stringify(skillAdvantage)},
              self_evaluation=${JSON.stringify(selfEvaluation)},
              updated_at=CURRENT_TIMESTAMP
            WHERE id = ${resume.id};
            `;
      }

      return sql`
          INSERT INTO resumes (id,user_id, name, job_title, intended_city, current_status, age, phone, wechat, email, qr_code, site_url, skill_advantage, self_evaluation)
          VALUES (${resume.id}, ${resume.user_id}, ${resume.name}, ${
        resume.jobTitle
      }, ${resume.intendedCity}, ${resume.currentStatus}, ${resume.age}, ${
        resume.phone
      }, ${resume.wechat}, ${resume.email}, ${resume.qrCode}, ${
        resume.siteUrl
      }, ${JSON.stringify(skillAdvantage)}, ${JSON.stringify(selfEvaluation)});
        `;
    })
  );
  return insertedResumes;
}
async function seedWorkExperiences() {
  await sql`
      CREATE TABLE IF NOT EXISTS work_experience (
        id SERIAL PRIMARY KEY,
        resume_id INT NOT NULL,
        period VARCHAR(20) ,
        company VARCHAR(100) ,
        position VARCHAR(100) ,
        responsibilities JSON ,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (resume_id) REFERENCES resumes(id)
      );
    `;
  // 检查索引是否存在 创建索引
  const indexExists = await sql`
      SELECT indexname
      FROM pg_indexes
      WHERE tablename ='work_experience' AND indexname = 'idx_work_experience_resume_id';
      `;
  if (indexExists.length === 0) {
    await sql`CREATE INDEX idx_work_experience_resume_id ON work_experience (resume_id);`;
  }
  const insertedWorkExperiences = await Promise.all(
    workExperience.map(async (item) => {
      const resume_id = 1;
      const searchRes =
        await sql`SELECT id FROM work_experience WHERE id = ${item.id}`;
      if (searchRes.length > 0) {
        // 存在，更新
        return await sql`
            UPDATE work_experience
            SET period = ${item.period}, 
            company = ${item.company}, 
            position = ${item.position}, 
            responsibilities = ${JSON.stringify(item.responsibilities)}, 
            updated_at = CURRENT_TIMESTAMP
            WHERE id = ${item.id};
          `;
      }
      return sql`
          INSERT INTO work_experience (id,resume_id, period, company, position, responsibilities)
          VALUES (${item.id},${resume_id}, ${item.period}, ${item.company}, ${
        item.position
      }, ${JSON.stringify(item.responsibilities)});
        `;
    })
  );
  return insertedWorkExperiences;
}

async function seedProjects() {
  await sql`
      CREATE TABLE IF NOT EXISTS project_experience (
        id SERIAL PRIMARY KEY,
        resume_id INT NOT NULL,
        name VARCHAR(100),
        tech_stack VARCHAR(200),
        description TEXT ,
        responsibilities JSON ,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (resume_id) REFERENCES resumes(id)
      );
    `;
  // 检查索引是否存在 创建索引
  const indexExists = await sql`
      SELECT indexname
      FROM pg_indexes
      WHERE tablename ='project_experience' AND indexname = 'idx_projects_resume_id';
      `;
  if (indexExists.length === 0) {
    await sql`CREATE INDEX idx_projects_resume_id ON project_experience (resume_id);`;
  }
  const insertedProjects = await Promise.all(
    projectExperience.map(async (item) => {
      const resume_id = 1;

      const project =
        await sql`SELECT id FROM project_experience WHERE id = ${item.id}`;
      if (project.length > 0) {
        return sql`
            UPDATE project_experience
            SET name = ${item.name},
            tech_stack = ${item.techStack},
            description = ${item.description},
            responsibilities = ${JSON.stringify(item.responsibilities)},
            updated_at = CURRENT_TIMESTAMP
            WHERE id = ${item.id};
          `;
      }
      return sql`
          INSERT INTO project_experience (id, resume_id, name, tech_stack, description, responsibilities)
          VALUES (${item.id},${resume_id}, ${item.name}, ${item.techStack}, ${
        item.description
      }, ${JSON.stringify(item.responsibilities)});
        `;
    })
  );
  return insertedProjects;
}
async function seedPersonalProjects() {
  await sql`
      CREATE TABLE IF NOT EXISTS personal_projects (
        id SERIAL PRIMARY KEY,
        resume_id INT NOT NULL,
        name VARCHAR(100),
        description TEXT,
        url VARCHAR(255),
        tech_stack VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (resume_id) REFERENCES resumes(id)
      );
    `;
  // 检查索引是否存在 创建索引
  const indexExists = await sql`
      SELECT indexname
      FROM pg_indexes
      WHERE tablename ='personal_projects' AND indexname = 'idx_personal_projects_resume_id';
      `;
  if (indexExists.length === 0) {
    await sql`CREATE INDEX idx_personal_projects_resume_id ON personal_projects (resume_id);`;
  }
  const insertedProjects = await Promise.all(
    personalProjects.map(async (item) => {
      const resume_id = 1;
      // 判断id是否存在，存在不插入，不存在插入
      const project =
        await sql`SELECT id FROM personal_projects WHERE id = ${item.id}`;
      if (project.length > 0) {
        return sql`
            UPDATE personal_projects
            SET name = ${item.name},
            description = ${item.description},
            url = ${item.url},
            tech_stack = ${item.techStack},
            updated_at = CURRENT_TIMESTAMP
            WHERE id = ${item.id};
          `;
      }
      return sql`
          INSERT INTO personal_projects (id,resume_id, name, description, url, tech_stack)
          VALUES (${item.id},${resume_id}, ${item.name}, ${item.description}, ${item.url}, ${item.techStack});
        `;
    })
  );
  return insertedProjects;
}
async function seedPrivacyConfig() {
  await sql`
      CREATE TABLE IF NOT EXISTS privacy_config (
        id SERIAL PRIMARY KEY,
        resume_id INT NOT NULL,
        password VARCHAR(255),
        mask_text JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (resume_id) REFERENCES resumes(id)
      );
    `;
  // 检查索引是否存在 创建索引
  const indexExists = await sql`
      SELECT indexname
      FROM pg_indexes
      WHERE tablename ='privacy_config' AND indexname = 'idx_privacy_config_resume_id';
      `;
  if (indexExists.length === 0) {
    await sql`CREATE INDEX idx_privacy_config_resume_id ON privacy_config (resume_id);`;
  }
  const { id, password, maskText } = privacyConfig;
  // 判断id是否存在，存在不插入，不存在插入
  const searchRes = await sql`SELECT id FROM privacy_config WHERE id = ${id}`;
  if (searchRes.length > 0) {
    return sql`
        UPDATE privacy_config
        SET password = ${password},
        mask_text = ${JSON.stringify(maskText)},
        updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id};
      `;
  }

  const insertedPrivacyConfig = await sql`
      INSERT INTO privacy_config (id,resume_id, password, mask_text)
      VALUES (${id},${1}, ${password}, ${JSON.stringify(maskText)});
    `;
  return insertedPrivacyConfig;
}

async function seedEducation() {
  await sql`
      CREATE TABLE IF NOT EXISTS education (
        id SERIAL PRIMARY KEY,
        resume_id INT NOT NULL,
        period VARCHAR(20),
        school VARCHAR(100),
        major VARCHAR(100),
        verification_code VARCHAR(50),
        verification_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (resume_id) REFERENCES resumes(id)
      );
    `;
  // 检查索引是否存在 创建索引
  const indexExists = await sql`
      SELECT indexname
      FROM pg_indexes
      WHERE tablename ='education' AND indexname = 'idx_education_resume_id';
      `;
  if (indexExists.length === 0) {
    await sql`CREATE INDEX idx_education_resume_id ON education (resume_id);`;
  }
  const insertedEducation = await Promise.all(
    education.map(async (item) => {
      const resume_id = 1;
      // 判断id是否存在，存在不插入，不存在插入
      const searchRes =
        await sql`SELECT id FROM education WHERE id = ${item.id}`;
      if (searchRes.length > 0) {
        return sql`
            UPDATE education
            SET period = ${item.period},
            school = ${item.school},
            major = ${item.major},
            verification_code = ${item.verificationCode},
            verification_url = ${item.verificationUrl},
            updated_at = CURRENT_TIMESTAMP
            WHERE id = ${item.id};
          `;
      }
      return sql`
          INSERT INTO education (id,resume_id, period, school, major, verification_code, verification_url)
          VALUES (${item.id},${resume_id}, ${item.period}, ${item.school}, ${item.major}, ${item.verificationCode}, ${item.verificationUrl});
        `;
    })
  );
  return insertedEducation;
}
export async function GET() {
  try {
    const result = await sql.begin(() => [
      setSessionTimezone(),
      seedUsers(),
      seedResumes(),
      seedEducation(),
      seedProjects(),
      seedPersonalProjects(),
      seedPrivacyConfig(),
      seedWorkExperiences(),
    ]);
    console.log("初始化数据--get", result);

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  } finally {
    await sql.end();
  }
}
