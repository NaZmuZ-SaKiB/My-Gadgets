import { TUser } from "./user.type";

export type TShippingAddress = {
  _id: string;
  user: TUser;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  district: string;
  division: string;
  zipCode: string;
  phone: string;
  default: boolean;

  createdAt: Date;
  updatedAt: Date;
};
