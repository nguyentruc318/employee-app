import EmployeeList from "../components/employee/employee-list";

export default function EmployeePage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employee List</h1>
      </div>
      <EmployeeList />
    </div>
  );
}
