import { TUser } from "./user.type";

export type TMedia = {
  _id: string;
  name: string;
  publicId: string;
  height: number;
  width: number;
  format: string;
  url: string;
  secureUrl: string;
  thumbnailUrl: string;

  createdAt: string;
  updatedAt: string;
  updatedBy: TUser | string;
};
