import { useEffect, useState } from "react";
import type { Employee } from "../../types/empolyee.type";
import employeeApi from "../../services/employee.service";
import EmployeeTable from "./employee-table";
import Button from "../Button";
import Modal from "../modal";
import EmployeeForm from "./employee-form";
import DeleteForm from "./delete-form";
import axios from "axios";
import SearchEmployee from "./search-employee";
import FilterEmployee from "./filter-employee";
import { genAvatar } from "../../utils/generate-avatar";
import Pagination from "../pagination";
import { ITEM_PER_PAGE } from "../../constants/contanst";
import SortItem from "./sort-item";

export default function EmployeeList() {
  const [employee, setEmployee] = useState<Employee[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortItem, setSortItem] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(10);
  const [filterCountry, setFilterCountry] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [error, setError] = useState("");
  const fetchEmployees = async () => {
    try {
      setIsLoading(true);

      const params = {
        ...(search && { "name:contains": search }),
        ...(filterCountry && { country: filterCountry }),
        _page: currentPage,
        _per_page: ITEM_PER_PAGE,
        ...(sortItem ? { _sort: sortItem } : {}),
      };
      const response = await employeeApi.getAllEmployees(params);
      setEmployee(response.data.data);
      setTotalPages(response.data.pages);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError(error.message);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, [search, filterCountry, currentPage, sortItem]);
  const handleEdit = (employee: Employee) => {
    setIsModalOpen(true);
    setSelectedEmployee(employee);
  };
  const handleAdd = () => {
    setIsModalOpen(true);
    setSelectedEmployee(null);
  };

  const handleSubmit = async (data: Omit<Employee, "id">) => {
    try {
      if (selectedEmployee) {
        await employeeApi.updateEmployee(selectedEmployee.id, data);
      } else {
        const newEmployee = { ...data, avatar: genAvatar(employee.length) };
        await employeeApi.addEmployee(newEmployee);
      }
      setIsModalOpen(false);
      await fetchEmployees();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError(error.message);
        }
      }
    }
  };
  const handleDelete = async (id: number) => {
    try {
      await employeeApi.deleteEmployee(id);
      await fetchEmployees();
      setIsDeleteModalOpen(false);
      setSelectedEmployee(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError(error.message);
        }
      }
    }
  };
  const handleDeleteClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="h-6">{isLoading && <p>Loading...</p>}</div>
      {error && <p>{error}</p>}
      <Button onClick={handleAdd} className="mb-2" variant="primary">
        Add Employee
      </Button>
      <div className="flex gap-2 ">
        <SearchEmployee onSearch={setSearch} />
        <FilterEmployee onFilter={setFilterCountry} />
        <SortItem onSort={setSortItem} />
      </div>
      {employee && (
        <EmployeeTable
          employees={employee}
          onEdit={handleEdit}
          onDeleteClick={handleDeleteClick}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <EmployeeForm
            key={selectedEmployee?.id}
            initialData={selectedEmployee}
            onSubmit={handleSubmit}
          />
        </Modal>
      )}
      {isDeleteModalOpen && selectedEmployee && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        >
          <DeleteForm
            deletedEmployee={selectedEmployee}
            onDelete={handleDelete}
          />
        </Modal>
      )}
    </div>
  );
}
