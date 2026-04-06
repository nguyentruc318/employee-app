import type { Employee } from "../../types/empolyee.type";
import EmployeeRow from "./empolyee-row";
import { useTranslation } from "react-i18next";

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDeleteClick: (employee: Employee) => void;
}

const EmployeeTable = ({
  employees,
  onEdit,
  onDeleteClick,
}: EmployeeTableProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2  w-full">
      {/* Table Header */}
      <div className="  ">
        <div className="hidden md:flex justify-between items-center bg-gray-100 p-4 rounded-t-sm w-full font-bold text-gray-700 border-b border-gray-300">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-10 shrink-0"></div> {/* Space for Avatar */}
            <div className="flex gap-4 items-center flex-1">
              <p className="w-40">{t("employee.table.name")}</p>
              <p className="w-20">{t("employee.table.age")}</p>
              <p className="w-32">{t("employee.table.phone")}</p>
              <p className="w-32">{t("employee.table.country")}</p>
            </div>
          </div>
          <div className="w-[160px] text-center">
            {t("employee.table.actions")}
          </div>
        </div>

        {/* Employee List Container */}
        <div className="flex flex-col gap-4 border border-gray-200 p-4 rounded-b-sm h-[500px] overflow-y-auto bg-white shadow-inner">
          {employees.length > 0 ? (
            employees.map((employee) => (
              <EmployeeRow
                key={employee.id}
                employee={employee}
                onEdit={onEdit}
                onDeleteClick={onDeleteClick}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 py-10 uppercase font-medium">
              No data found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
