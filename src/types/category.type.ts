import { TUser } from "./user.type";

export type TCategory = {
  _id: string;
  name: string;
  label: string;

  createdAt: Date;
  updatedAt: Date;
  updatedBy: TUser | string;
};
