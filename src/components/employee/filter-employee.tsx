import { useTranslation } from "react-i18next";

export default function FilterEmployee({
  onFilter,
}: {
  onFilter: (country: string) => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="mb-2 ">
      <select
        onChange={(e) => onFilter(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none md:w-48 bg-white"
      >
        <option value="">{t("employee.filter_countries")}</option>
        <option value="Vietnam">{t("employee.countries.vietnam")}</option>
        <option value="USA">{t("employee.countries.usa")}</option>
        <option value="Japan">{t("employee.countries.japan")}</option>
        <option value="Korea">{t("employee.countries.korea")}</option>
      </select>
    </div>
  );
}
