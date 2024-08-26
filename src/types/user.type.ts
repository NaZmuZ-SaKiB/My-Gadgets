export type TUserRole = "super_admin" | "admin" | "user";

export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  addresses: string[];

  createdAt?: Date;
  updatedAt?: Date;
};
