import type { Employee } from "../../types/empolyee.type";
import Button from "../Button";
import EmployeeRow from "./empolyee-row";

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
  return (
    <>
      <div className="flex flex-col gap-4 bg border border-gray-200 p-4 rounded-sm h-96 overflow-y-auto">
        {employees.map((employee) => (
          <EmployeeRow
            key={employee.id}
            employee={employee}
            onEdit={onEdit}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </div>
    </>
  );
};

export default EmployeeTable;
