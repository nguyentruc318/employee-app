import type { Employee } from "../../types/empolyee.type";
import Button from "../Button";

type Props = {
  deletedEmployee: Employee;
  onDelete: (id: string) => void;
};
export default function DeleteForm({ deletedEmployee, onDelete }: Props) {
  return (
    <>
      <p>Are you sure you want to delete {deletedEmployee.name}?</p>
      <div className="flex gap-2">
        <Button onClick={() => onDelete(deletedEmployee.id)} variant="danger">
          Delete
        </Button>
      </div>
    </>
  );
}
