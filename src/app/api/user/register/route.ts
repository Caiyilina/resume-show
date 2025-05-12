import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import postgres from "postgres";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });
export async function POST(request: Request) {
  // 获取请求体
  const body = await request.json();
  const { username, password, email } = body;
  if (!username || !password || !email) {
    return NextResponse.json({ message: "字段不能为空", isOk: false });
  }
  console.log("注册请求--", username, password);
  const hashedPassword = await bcrypt.hash(password, 10);

  const isUserExist = await sql`
    SELECT username 
    FROM users 
    WHERE username=${username} ;
    `;
  const isEmailExist = await sql`
    SELECT username 
    FROM users 
    WHERE  email=${email};
    `;
  console.log("是否重复", isUserExist);

  if (isUserExist.length === 0 && isEmailExist.length == 0) {
    await sql`INSERT INTO users (username, email, password)
          VALUES ( ${username}, ${email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
    // 检查是否插入成功

    const isExist = await sql`
        SELECT username 
        FROM users 
        WHERE username=${username} and email=${email};
        `;
    console.log("检查是否插入成功", isExist);

    if (isExist.length == 1) {
      return NextResponse.json({ message: "注册成功", isOk: true });
    }
  } else {
    const message = `${isUserExist.length > 0 ? "用户名" : ""}${
      isUserExist.length > 0 && isEmailExist.length > 0 ? "或" : ""
    }${isEmailExist.length > 0 ? "邮箱" : ""}已存在`;
    return NextResponse.json({ message, isOk: false });
  }
}
