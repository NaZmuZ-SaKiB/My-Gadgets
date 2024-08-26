import { TUser } from "./user.type";

export type TCategory = {
  _id: string;
  name: string;
  label: string;
  featured: boolean;
  showOnTopMenu: boolean;
  image: string;

  createdAt: Date;
  updatedAt: Date;
  updatedBy: TUser | string;
};
