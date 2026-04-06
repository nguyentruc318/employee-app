import type { Employee } from "../../types/empolyee.type";
import Button from "../Button";
import { useTranslation } from "react-i18next";

const EmployeeRow = ({
  employee,
  onEdit,
  onDeleteClick,
}: {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDeleteClick: (employee: Employee) => void;
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row md:justify-between items-center bg-gray-200 sm:p-2 p-4 rounded-sm w-full">
      <div className="flex items-center gap-4 flex-1">
        <img
          src={employee.avatar}
          alt={employee.name}
          className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-300 shadow-sm"
        />
        <div className="flex flex-col md:flex-row gap-1 md:gap-4 flex-1">
          <p className="w-full md:w-40 font-bold md:font-medium text-lg md:text-base text-blue-700 md:text-gray-900">
            {employee.name}
          </p>
          <p className="w-full md:w-20 text-gray-600">
            {employee.age} {t("employee.age_unit")}
          </p>
          <p className="w-full md:w-32 text-gray-600">{employee.phone}</p>
          <p className="w-full md:w-32 text-gray-600">{employee.country}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-4 md:mt-0 justify-end">
        <Button onClick={() => onEdit(employee)} variant="primary">
          {t("employee.form.edit_title")}
        </Button>
        <Button onClick={() => onDeleteClick(employee)} variant="danger">
          {t("employee.form.delete")}
        </Button>
      </div>
    </div>
  );
};
export default EmployeeRow;
