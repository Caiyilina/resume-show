import {
  PRIVACY_PASSWORD,
  privacyConfig,
  resumeData,
} from "@/app/lib/resumeData";
import { ResumeData } from "@/app/lib/type";
import { NextResponse } from "next/server";

// 定义需要掩码的字段配置类型
type FieldsToMask = {
  [section: string]: string[];
};

// 定义掩码配置类型
type MaskConfig = Record<string, { unauthenticated?: string }>;

/**
 *
 * @param data ResumeData 需要掩码的数据
 * @param isAuth 是否认证状态
 * @param fieldsToMask 需要掩码的字段配置
 * @param maskConfig 掩码配置
 * @returns
 */
function maskPrivateData(
  data: ResumeData,
  isAuth: boolean,
  fieldsToMask: FieldsToMask = {},
  maskConfig: MaskConfig = {}
): ResumeData {
  if (isAuth) {
    return data;
  }
  const maskedData = { ...data }; // 创建一个新对象，避免直接修改原始数据
  //  遍历需要掩码的字段配置
  Object.entries(fieldsToMask).forEach(([section, fields]) => {
    if (maskedData[section as keyof ResumeData]) {
      // 处理数组类型的字段
      if (Array.isArray(maskedData[section as keyof ResumeData])) {
        (maskedData[section as keyof ResumeData] as any[]).forEach((item) => {
          fields.forEach((field) => {
            if (item[field] !== undefined) {
              item[field] =
                maskConfig[field] && maskConfig[field].unauthenticated
                  ? maskConfig[field]?.unauthenticated
                  : "*".repeat((item[field] as string).length);
            }
          });
        });
      }
      // 处理其他类型
      else {
        fields.forEach((field) => {
          const sectionKey = section as keyof ResumeData;
          if (maskedData[sectionKey] && field in maskedData[sectionKey]) {
            const value =
              maskedData[sectionKey][
                field as keyof (typeof maskedData)[typeof sectionKey]
              ];
            if (typeof value === "string") {
              maskedData[sectionKey][
                field as keyof (typeof maskedData)[typeof sectionKey]
              ] = (
                maskConfig[field as keyof MaskConfig]?.unauthenticated
                  ? maskConfig[field as keyof MaskConfig]?.unauthenticated
                  : "*".repeat(
                      (
                        maskedData[sectionKey][
                          field as keyof (typeof maskedData)[typeof sectionKey]
                        ] as string
                      ).length
                    )
              ) as never;
            }
          }
        });
      }
    }
  });
  return maskedData;
}

// 定义需要掩码的字段配置
const fieldsToMask = {
  personalInfo: ["name", "phone"],
  education: ["school", "major", "verificationCode", "period"],
  workExperience: ["company"],
};

export async function POST(request: Request) {
  // 获取请求体
  const body = await request.json();
  const { password } = body;
  console.log("请求体：", password);
  const isAuthenticated = password === PRIVACY_PASSWORD;
  console.log("是否认证：", isAuthenticated);

  //   TODO
  try {
    const maskedResume = maskPrivateData(
      resumeData,
      isAuthenticated,
      fieldsToMask,
      privacyConfig.maskText
    );
    return NextResponse.json({
      data: maskedResume,
      code: 200,
      isAuthenticated,
    });
  } catch (error) {
    return NextResponse.json({ message: error, code: 400, isAuthenticated });
  }
}
