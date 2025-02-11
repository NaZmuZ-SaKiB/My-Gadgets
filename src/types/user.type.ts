export type TUserRole = "super_admin" | "admin" | "user" | "test_admin";

export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  addresses: string[];

  createdAt?: Date;
  updatedAt?: Date;
};

export type TDashboard = {
  totalUsers: number;
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  completedOrders: number;
  canceledOrders: number;
  totalSale: number;
  totalProducts: number;
  totalReviews: number;
  [key: string]: number;
};
