import { TProduct } from "./product.type";
import { TUser } from "./user.type";

export type TReviewStatus = "pending" | "approved" | "rejected";

export type TReview = {
  _id: string;
  product: TProduct;
  user: TUser;
  rating: number;
  comment: string;
  status: TReviewStatus;

  createdAt: Date;
  updatedAt: Date;
};
