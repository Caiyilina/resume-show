import { getIronSession } from "iron-session";
import { NextRequest, NextResponse } from "next/server";
import { SessionData, sessionOptions } from "../route";
import { cookies } from "next/headers";

//  post 请求  验证验证码是否正确
export async function GET(request: NextRequest) {
  // const { captcha } = await request.json();
  const { searchParams } = new URL(request.url);
  const captcha = searchParams.get("captcha");
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(
    cookieStore,
    sessionOptions
  );
  const sessionCaptcha = session.captcha;
  console.log("sessionCaptcha", sessionCaptcha);
  console.log("captcha", captcha);

  if (captcha === sessionCaptcha) {
    return NextResponse.json({ message: "验证码正确" });
  } else {
    return NextResponse.json({ message: "验证码错误" });
  }
}
