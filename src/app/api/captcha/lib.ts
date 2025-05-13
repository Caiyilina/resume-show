export const sessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production", // 生产环境设为true
    maxAge: 60 * 60 * 1000, // 例如设置过期时间为1小时
    sameSite: "lax",
  },
};
export interface SessionData {
  captcha?: string;
}
