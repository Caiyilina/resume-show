import { H1Icon } from "@heroicons/react/24/outline";

const SectionCard = ({
  title,
  children,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) => (
  <div className="rounded-xl bg-white p-6 shadow-md">
    <div className="mb-4 flex text-base md:text-lg items-center gap-x-3">
      <div className="h-6 w-6 md:h-8 md:w-8 text-blue-400">
        {icon ? icon : <H1Icon />}
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
    </div>
    <div className="space-y-6">{children}</div>
  </div>
);
// 详情信息，支持
export { SectionCard };
