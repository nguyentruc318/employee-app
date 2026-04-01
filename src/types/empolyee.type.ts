export interface Employee {
  id: number;
  name: string;
  age: number;
  phone: string;
  country: string;
  isAvailable: boolean;
  avatar?: string;
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
export type LoginBodyType = {
  username: string;
  password: string;
};
export interface PaginatedResponse<T> {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: T[];
}
export interface GoogleUser {
  name: string;
  email: string;
  picture: string;
  sub: string; // ID người dùng
}
