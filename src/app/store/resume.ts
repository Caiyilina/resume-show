import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ResumeData } from "../lib/type";

interface ResumeState {
  resumeData: ResumeData | null;
  isAuth: boolean;
  loading: boolean;
  error: object | string | null;
  fetchResumeData: (password?: string) => Promise<void>;
  clearAuth: () => void;
}

const useResumeStore = create<ResumeState>()(
  devtools(
    persist(
      (set) => ({
        resumeData: null,
        isAuth: false,
        loading: false,
        error: null,
        fetchResumeData: async (password = "") => {
          set({ loading: true, error: null });
          try {
            const response = await fetch("/api/getResume", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ password }),
            });
            console.log("请求结果---", response);

            if (!response.ok) throw new Error("请求失败");

            const { data, code, isAuthenticated } = await response.json();
            console.log(" 获取的数据---", data, code, isAuthenticated);

            if (code == 200) {
              set({
                resumeData: data,
                isAuth: isAuthenticated,
                loading: false,
              });
            } else {
              set({
                resumeData: null,
                isAuth: false,
                loading: false,
              });
            }
          } catch (error) {
            set({
              loading: false,
              error: error || "获取错误",
            });
          }
        },

        clearAuth: () => {
          set({
            isAuth: false,
          });
        },
      }),
      {
        name: "resume-store",
      }
    )
  )
);
export default useResumeStore;
