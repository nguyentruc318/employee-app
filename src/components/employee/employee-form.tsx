import { useState } from "react";
import type { Employee } from "../../types/empolyee.type";
import Button from "../Button";

type Props = {
  initialData?: Employee | null;
  onSubmit: (data: Employee) => void;
};
export default function EmployeeForm({ initialData, onSubmit }: Props) {
  const [formData, setFormData] = useState<Employee>({
    id: initialData?.id || "",
    name: initialData?.name || "",
    age: initialData?.age || 0,
    phone: initialData?.phone || "",
    country: initialData?.country || "",
    isAvailable: initialData?.isAvailable || false,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";

  return (
    <form onSubmit={handleSubmit} className="w-96">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {initialData ? "Edit Employee" : "Add Employee"}
      </h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter name"
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            placeholder="Enter age"
            value={formData.age}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            placeholder="Enter country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isAvailable"
            id="isAvailable"
            checked={formData.isAvailable}
            onChange={handleChange}
            className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500 cursor-pointer"
          />
          <label
            htmlFor="isAvailable"
            className="text-sm font-medium text-gray-700 cursor-pointer"
          >
            Available
          </label>
        </div>
      </div>
      <div className="mt-6">
        <Button variant="primary">{initialData ? "Update" : "Create"}</Button>
      </div>
    </form>
  );
}
