import { NextRequest, NextResponse } from "next/server";

export const sessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production", // 生产环境设为true
    maxAge: 60 * 60 * 1000, // 例如设置过期时间为1小时
  },
};
export interface SessionData {
  captcha?: string;
}
export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/api/captcha/get", request.url));
}
