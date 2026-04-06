import http from "../utils/axios";
import type {
  Employee,
  EmployeeQueryParams,
  PaginatedResponse,
} from "../types/empolyee.type";
import type { AxiosRequestConfig } from "axios";

const employeeApi = {
  getAllEmployees: (
    params?: EmployeeQueryParams,
    config?: AxiosRequestConfig,
  ) =>
    http.get<PaginatedResponse<Employee>>("/employees", { params, ...config }),
  getEmployeeById: (id: number) => http.get<Employee>(`/employees/${id}`),
  addEmployee: (employee: Omit<Employee, "id">) =>
    http.post<Employee>("/employees", employee),
  updateEmployee: (id: number, employee: Omit<Employee, "id">) =>
    http.put<Employee>(`/employees/${id}`, employee),
  deleteEmployee: (id: number) => http.delete<void>(`/employees/${id}`),
};

export default employeeApi;
