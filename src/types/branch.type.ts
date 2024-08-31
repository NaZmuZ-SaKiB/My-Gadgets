import { TUser } from "./user.type";

export type TBranch = {
  _id: string;
  name: string;
  address: string;
  phone: string;
  mapLink?: string;

  createdAt: Date;
  updatedAt: Date;
  updatedBy: TUser;
};
