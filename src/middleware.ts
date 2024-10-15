import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { v4 as uuidv4 } from "uuid";
import configData from "@/config";

const intlMiddleware = createMiddleware({
  // 支持的语言列表
  locales: configData.supportedLocales,
  // 默认语言
  defaultLocale: configData.defaultLocale,
});

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  // console.log("process.env.NODE_ENV", process.env.NODE_ENV);

  // 检查是否存在设备ID cookie
  if (!request.cookies.has("deviceId")) {
    // 如果不存在,生成一个新的设备ID
    const deviceId = uuidv4();
    (response as NextResponse).cookies.set("deviceId", deviceId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 365, // 1年
    });
  }

  return response;
}

export const config = {
  // 匹配所有路径除了 /api, /_next, /_vercel, /images, /favicon.ico, /robots.txt
  matcher: [
    "/((?!api|_next|_vercel|images|logo.svg|.*\\.png|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
