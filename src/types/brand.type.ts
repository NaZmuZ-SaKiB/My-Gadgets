import { TUser } from "./user.type";

export type TBrand = {
  _id: string;
  name: string;
  featured: boolean;
  image: string;

  createdAt: Date;
  updatedAt: Date;
  updatedBy: TUser | string;
};
