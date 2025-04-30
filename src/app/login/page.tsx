export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">简历访问验证</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              访问密码
              <input
                type="password"
                name="password"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                placeholder="请输入访问密码"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            提交验证
          </button>
        </form>
      </div>
    </div>
  );
}