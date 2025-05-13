import { getIronSession } from "iron-session";
import { NextRequest, NextResponse } from "next/server";
import { SessionData, sessionOptions } from "../lib";
import { cookies } from "next/headers";

// TODO 需要改为post请求验证
export async function POST(request: NextRequest, response: NextResponse) {
  const { captcha } = await request.json();
  // const { searchParams } = new URL(request.url);
  // const captcha = searchParams.get("captcha");
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(
    cookieStore,
    sessionOptions
  );
  const sessionCaptcha = session.captcha;
  console.log(session, "---sessionCaptcha", sessionCaptcha);
  console.log("参数--captcha", captcha);

  if (captcha?.toLowerCase() === sessionCaptcha?.toLowerCase()) {
    return NextResponse.json({
      message: "验证码正确",
      isOk: true,
    });
  } else {
    return NextResponse.json({ message: "验证码错误", isOk: false });
  }
}
