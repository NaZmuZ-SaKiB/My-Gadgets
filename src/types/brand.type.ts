import { TMedia } from "./media.type";
import { TUser } from "./user.type";

export type TBrand = {
  _id: string;
  name: string;
  featured: boolean;
  image?: TMedia;

  createdAt: Date;
  updatedAt: Date;
  updatedBy: TUser | string;
};
