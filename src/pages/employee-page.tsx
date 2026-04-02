import EmployeeList from "../components/employee/employee-list";
import Header from "../components/header";

export default function EmployeePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Employee Directory
          </h1>
        </div>
        <EmployeeList />
      </main>
    </div>
  );
}
