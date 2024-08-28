import { TMedia } from "./media.type";
import { TUser } from "./user.type";

export type TCategory = {
  _id: string;
  name: string;
  label: string;
  featured: boolean;
  showOnTopMenu: boolean;
  image?: TMedia;
  parent?: string | TCategory;
  subCategories: string[] | TCategory[];

  createdAt: Date;
  updatedAt: Date;
  updatedBy: TUser | string;
};
