import { resumeData } from "@/app/lib/resumeData";
import { NextResponse } from "next/server";

export async function GET() {
  //   TODO
  return NextResponse.json({ data: resumeData });
}
