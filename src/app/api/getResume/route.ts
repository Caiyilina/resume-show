import { resumeData } from "@/app/lib/resumeData";
import { ResumeData } from "@/app/lib/type";
import { NextResponse } from "next/server";

// 定义需要掩码的字段配置类型
type FieldsToMask = {
  [section: string]: string[];
};

// 定义掩码配置类型
type MaskConfig = {
  [field: string]: {
    unauthenticated: string;
  };
};
/**
 * 对数据进行隐私保护处理
 * @param {Object} data - 原始数据对象
 * @param {Boolean} isAuthenticated - 是否已认证
 * @param {Object} fieldsToMask - 需要掩码的字段配置，格式为 {section: [fields]}
 * @param {String} maskConfig - 掩码配置对象
 * @returns {Object} - 处理后的数据
 */
function maskPrivateData<T extends object>(
  data: ResumeData,
  isAuth: boolean,
  fieldsToMask: FieldsToMask = {},
  maskConfig: MaskConfig = {}
) {
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
          if (maskedData[section as keyof ResumeData]![field] !== undefined) {
          }
        });
      }
    }
  });
}

export async function GET() {
  //   TODO
  return NextResponse.json({ data: resumeData });
}
