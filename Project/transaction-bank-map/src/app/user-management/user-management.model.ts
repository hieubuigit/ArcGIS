import { SelectItem } from "../share/common";

export interface User {
  id: number,
  userId: string,
  email: string,
  fullName: string,
  userName: string,
  status: UserStatus,
  createdDate: string,
  updatedDate: string,
  userType: UserType,
  phone: string,
  gender: Gender,
  address: string,
  password: string,
}

export enum UserType {
  Guest,
  User,
  Admin,
}

export const UserTypeItems : SelectItem<UserType>[] = [
  {name: "Admin", value:  UserType.Admin},
  {name: "User", value:  UserType.User},
];

export enum Gender {
  Male,
  Female,
  Other
}

export const GenderItems : SelectItem<Gender>[] = [
  {name: "Nam", value: Gender.Male},
  {name: "Nữ", value: Gender.Female},
  {name: "Khác", value: Gender.Other},
];

export enum UserStatus {
  Active,
  Inactive,
};

export const UserStatusItems : SelectItem<UserStatus>[] = [
  {name: "Active", value: UserStatus.Active},
  {name: "InActive", value: UserStatus.Inactive},
];

export const sampleUsers: User[] = [
  {
    id: 1,
    userId: 'USR001',
    email: 'alice@example.com',
    fullName: 'Alice Smith',
    userName: 'alice_smith',
    status: UserStatus.Active,
    createdDate: '2023-01-01T08:00:00Z',
    updatedDate: '2023-09-01T08:00:00Z',
    userType: UserType.Admin,
    phone: '123-456-7890',
    gender: Gender.Female,
    address: '123 Main St, Anytown, USA',
    password: '123456789',
  },
  {
    id: 2,
    userId: 'USR002',
    email: 'bob@example.com',
    fullName: 'Bob Johnson',
    userName: 'bob_johnson',
    status: UserStatus.Inactive,
    createdDate: '2023-01-05T08:00:00Z',
    updatedDate: '2023-09-02T08:00:00Z',
    userType: UserType.Guest,
    phone: '234-567-8901',
    gender: Gender.Male,
    address: '456 Elm St, Othertown, USA',
    password: '123456789',
  },
  {
    id: 3,
    userId: 'USR003',
    email: 'charlie@example.com',
    fullName: 'Charlie Brown',
    userName: 'charlie_brown',
    status: UserStatus.Active,
    createdDate: '2023-02-10T08:00:00Z',
    updatedDate: '2023-09-03T08:00:00Z',
    userType: UserType.User,
    phone: '345-678-9012',
    gender: Gender.Male,
    address: '789 Oak St, Sometown, USA',
    password: '123456789',
  },
  {
    id: 4,
    userId: 'USR004',
    email: 'david@example.com',
    fullName: 'David Wilson',
    userName: 'david_wilson',
    status: UserStatus.Active,
    createdDate: '2023-03-15T08:00:00Z',
    updatedDate: '2023-09-04T08:00:00Z',
    userType: UserType.Admin,
    phone: '456-789-0123',
    gender: Gender.Male,
    address: '101 Pine St, Anycity, USA',
    password: '123456789',
  },
  {
    id: 5,
    userId: 'USR005',
    email: 'eve@example.com',
    fullName: 'Eve Davis',
    userName: 'eve_davis',
    status: UserStatus.Active,
    createdDate: '2023-04-20T08:00:00Z',
    updatedDate: '2023-09-05T08:00:00Z',
    userType: UserType.User,
    phone: '567-890-1234',
    gender: Gender.Male,
    address: '202 Maple St, Yourtown, USA',
    password: '123456789',
  },
];
