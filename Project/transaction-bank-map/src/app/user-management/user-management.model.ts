import { Paging, SelectItem } from '../share/common';

export interface QueryParams extends Paging {
  role: string;
}
export interface CreateOrUpdate {
  id: string;
  username: string;
  password: string;
}

export interface CreateOrUpdateUser {
  code: string;
  username: string;
  password: string;
  fullName: string;
  email: string;
  role: UserType;
  phoneNumber: string;
  gender: Gender;
  address: string;
}

export interface User {
  id: string;
  code: string;
  username: string;
  password: string;
  userId: string;
  email: string;
  fullName: string;
  status: UserStatus;
  createdDate: string;
  updatedDate: string;
  role: UserType;
  phoneNumber: string;
  gender: Gender;
  address: string;

  lastLogin: null;
  createdAt: number;
  createdBy: string;
  updatedAt: number;
  updatedBy: string;
  createdUser: CreateOrUpdate;
  updatedUser: CreateOrUpdate;
}


export interface UserPaging {
  total: number,
  totalPage: number,
  users: User[],
}

export enum UserType {
  Guest,
  Admin,
  User,
}

export const UserTypeItems: SelectItem<UserType>[] = [
  { name: 'Admin', value: UserType.Admin },
  { name: 'User', value: UserType.User },
];

export enum Gender {
  Other,
  Female,
  Male,
}

export const GenderItems: SelectItem<Gender>[] = [
  { name: 'Nam', value: Gender.Male },
  { name: 'Nữ', value: Gender.Female },
  { name: 'Khác', value: Gender.Other },
];

export enum UserStatus {
  Inactive,
  Active,
}

export const UserStatusItems: SelectItem<UserStatus>[] = [
  { name: 'Active', value: UserStatus.Active },
  { name: 'InActive', value: UserStatus.Inactive },
];

export const columns = [
  'code',
  'email',
  'phoneNumber',
  'fullName',
  'username',
  'role',
  'status',
  'createdAt',
  'updatedAt',
  'action',
];
