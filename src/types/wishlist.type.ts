import { TProduct } from "./product.type";
import { TUser } from "./user.type";

export type TWishlist = {
  user: TUser;
  products: TProduct[];

  createdAt: Date;
  updatedAt: Date;
};
