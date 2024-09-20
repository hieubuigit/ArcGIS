export interface User {
  id: number,
  code: string,
  email: string,
  fullName: string,
  userType: string,
  status: UserType,
  createdDate: string,
  updatedDate: string,
  role: UserType,
  phone: string,
  gender: Gender,
  address: string,
}

export enum UserType {
  User,
  Admin,
}

export enum Gender {
  Male,
  Female,
  Other
}
