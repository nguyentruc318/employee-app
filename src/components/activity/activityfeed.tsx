import { useTranslation } from "react-i18next";
import { useAppStore } from "../../store";

export default function ActivityFeed() {
  const activities = useAppStore((state) => state.activities);
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 w-full h-fit sticky top-24">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
        {t("employee.activity.title")}
      </h3>

      {activities.length === 0 ? (
        <p className="text-sm text-gray-400 italic">
          {t("employee.activity.empty")}
        </p>
      ) : (
        <div className="space-y-4">
          {activities.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 text-sm animate-in fade-in slide-in-from-right-4 duration-300"
            >
              <div className="mt-1">
                {item.type === "add"}
                {item.type === "update"}
                {item.type === "delete"}
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">{item.name}</span>
                  {item.type === "add" &&
                    t("employee.activity.added", { name: item.name })}
                  {item.type === "update" &&
                    t("employee.activity.updated", { name: item.name })}
                  {item.type === "delete" &&
                    t("employee.activity.deleted", { name: item.name })}
                </p>
                <span className="text-[10px] text-gray-400">
                  {new Date(item.time).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
