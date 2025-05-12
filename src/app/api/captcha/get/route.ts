import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import svgCaptcha from "svg-captcha";
import { SessionData, sessionOptions } from "../lib";

// 获取验证码方法
async function getCaptcha() {
  const captcha = svgCaptcha.create({
    size: 4, // 验证码长度
    fontSize: 60, // 字体大小
    width: 120, // 宽度
    height: 50, // 高度
    background: "#f0f0f0", // 背景颜色
    ignoreChars: "0o1i", // 排除容易混淆的字符
    noise: 3, // 设置噪点的数量
    color: true, // 文字是否使用彩色
    charPreset: "0123456789abcdefghijklmnopqrstuvwxyz", // 自定义字符集
  });
  console.log("captcha", captcha);

  return captcha;
}

export async function GET() {
  const captcha = await getCaptcha();
  const cookieStore = await cookies();

  const session = await getIronSession<SessionData>(
    cookieStore,
    sessionOptions
  );

  session.captcha = captcha.text; // 将验证码存入 session 中
  await session.save();
  console.log("session", session);

  return new Response(captcha.data, {
    headers: { "Content-Type": "image/svg+xml" },
  });
}
