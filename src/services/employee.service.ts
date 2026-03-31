import http from "../utils/axios";
import type { Employee, EmployeeQueryParams } from "../types/empolyee.type";

const employeeApi = {
  getAllEmployees: (params?: EmployeeQueryParams) =>
    http.get<Employee[]>("/employees", { params }),
  getEmployeeById: (id: string) => http.get<Employee>(`/employees/${id}`),
  addEmployee: (employee: Employee) =>
    http.post<Employee>("/employees", employee),
  updateEmployee: (id: string, employee: Employee) =>
    http.put<Employee>(`/employees/${id}`, employee),
  deleteEmployee: (id: string) => http.delete<void>(`/employees/${id}`),
};

export default employeeApi;
