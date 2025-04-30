import bcrypt from "bcrypt";
import postgres from "postgres";
import { users } from "./mockdata";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

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
  // 添加列注释
  await sql`COMMENT ON COLUMN users.username IS '用户名';`;
  await sql`COMMENT ON COLUMN users.email IS '邮箱';`;
  await sql`COMMENT ON COLUMN users.password IS '密码';`;
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
async function seedResumes() {}
export async function GET() {
  try {
    const result = await sql.begin(() => [seedUsers()]);
    console.log("初始化数据--get", result);

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
