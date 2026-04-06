import { useTranslation } from "react-i18next";

export default function SortItem({
  onSort,
}: {
  onSort: (sortItem: string) => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="mb-2 ">
      <select
        onChange={(e) => onSort(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none md:w-48 bg-white"
      >
        <option value="">{t("employee.sort.placeholder")}</option>
        <option value="name">{t("employee.sort.name_asc")}</option>
        <option value="-name">{t("employee.sort.name_desc")}</option>
        <option value="age">{t("employee.sort.age_asc")}</option>
        <option value="-age">{t("employee.sort.age_desc")}</option>
      </select>
    </div>
  );
}
