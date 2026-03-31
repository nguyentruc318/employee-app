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
    <div className="flex justify-between items-center h-14 bg-gray-200 p-4 rounded-sm">
      <div className="flex gap-4">
        <p className="w-32">{employee.name}</p>
        <p className="w-32">{employee.age}</p>
        <p className="w-32">{employee.phone}</p>
        <p className="w-32">{employee.country}</p>
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
