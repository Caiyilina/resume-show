import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import postgres from "postgres";
import { User } from "@/app/lib/type";
import { SessionData, sessionOptions } from "../../captcha/lib";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function getUser(username: string): Promise<any> {
  try {
    const user = await sql<
      User[]
    >`SELECT * FROM users WHERE username=${username}`;
    return user[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}
export async function POST(request: NextRequest) {
  // 获取请求体
  const body = await request.json();
  const { username, password, captcha } = body;
  console.log("body==", body);

  if (!username || !password || !captcha) {
    return NextResponse.json({ message: "字段不能为空", isOk: false });
  }

  const verifyResponse = await fetch(
    new URL("/api/captcha/verify", request.url),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ captcha }),
    }
  );

  const verifyResult = await verifyResponse.json();
  console.log("验证结果", verifyResult);

  if (!verifyResult.isOk) {
    return NextResponse.json({ message: "验证码错误" }, { status: 401 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  // TODO: 从数据库获取用户信息
  const user = await getUser(username);
  console.log("hashedPassword", hashedPassword, user[0]);

  // 验证密码
  const isPasswordValid = await bcrypt.compare(
    hashedPassword,
    user[0].password
  );
  console.log("验证结果", isPasswordValid);

  if (!isPasswordValid) {
    return NextResponse.json({ message: "用户名或密码错误" }, { status: 401 });
  }

  return NextResponse.json({ message: "登录成功" });
}
