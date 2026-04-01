import type { Employee } from "../../types/empolyee.type";
import Button from "../Button";

const EmployeeRow = ({
  employee,
  onEdit,
  onDeleteClick,
}: {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDeleteClick: (employee: Employee) => void;
}) => {
  return (
    <div className="flex justify-between items-center bg-gray-200 p-4 rounded-sm w-full">
      <div className="flex items-center gap-4 flex-1">
        <img
          src={employee.avatar}
          alt={employee.name}
          className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-300 shadow-sm"
        />
        <div className="flex gap-4 items-center flex-1">
          <p className="w-40 font-medium">{employee.name}</p>
          <p className="w-20 text-gray-600">{employee.age} yrs</p>
          <p className="w-32 text-gray-600">{employee.phone}</p>
          <p className="w-32 text-gray-600">{employee.country}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => onEdit(employee)} variant="primary">
          Edit
        </Button>
        <Button onClick={() => onDeleteClick(employee)} variant="danger">
          Delete
        </Button>
      </div>
    </div>
  );
};
export default EmployeeRow;
