import { TUser } from "./user.type";

export type TCategory = {
  _id: string;
  name: string;
  label: string;
  featured: boolean;
  showOnTopMenu: boolean;
  image: string;
  parent?: string | TCategory;
  subCategories: string[] | TCategory[];

  createdAt: Date;
  updatedAt: Date;
  updatedBy: TUser | string;
};
