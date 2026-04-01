import http from "../utils/axios";
import type {
  Employee,
  EmployeeQueryParams,
  PaginatedResponse,
} from "../types/empolyee.type";

const employeeApi = {
  getAllEmployees: (params?: EmployeeQueryParams) =>
    http.get<PaginatedResponse<Employee>>("/employees", { params }),
  getEmployeeById: (id: number) => http.get<Employee>(`/employees/${id}`),
  addEmployee: (employee: Omit<Employee, "id">) =>
    http.post<Employee>("/employees", employee),
  updateEmployee: (id: number, employee: Omit<Employee, "id">) =>
    http.put<Employee>(`/employees/${id}`, employee),
  deleteEmployee: (id: number) => http.delete<void>(`/employees/${id}`),
};

export default employeeApi;
