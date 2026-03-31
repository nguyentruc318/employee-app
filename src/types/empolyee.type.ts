export interface Employee {
  id: string;
  name: string;
  age: number;
  phone: string;
  country: string;
  isAvailable: boolean;
}
export interface PaginationParams {
  _page?: number;
  _per_page?: number;
  _sort?: string;
  _order?: string;
  q?: string;
}
export interface EmployeeQueryParams extends PaginationParams {
  name?: string;
  age?: number;
  phone?: string;
  country?: string;
  isAvailable?: boolean;
  "name:contains"?: string;
}
