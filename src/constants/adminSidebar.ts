import {
  Images,
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  UsersRound,
} from "lucide-react";

export type TAdminSideBar = {
  name: string;
  icon?: any;
  link: string;
  hasSubMenu?: boolean;
  subMenus?: TAdminSideBar[];
};

export const adminSideBar: TAdminSideBar[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    link: "/admin",
  },
  {
    name: "Media",
    icon: Images,
    link: "/admin/media",
  },
  {
    name: "Products",
    icon: ShoppingBag,
    link: "/admin/products",
    hasSubMenu: true,
    subMenus: [
      {
        name: "All Products",
        link: "/admin/products",
      },
      {
        name: "Add Product",
        link: "/admin/products/add-product",
      },
      {
        name: "Categories",
        link: "/admin/categories",
      },
      {
        name: "Filters",
        link: "/admin/filters",
      },
      {
        name: "Reviews",
        link: "/admin/reviews",
      },
    ],
  },
  {
    name: "Orders",
    icon: ShoppingCart,
    link: "/admin/orders",
  },
  {
    name: "Users",
    icon: UsersRound,
    link: "/admin/users",
    hasSubMenu: true,
    subMenus: [
      {
        name: "All Users",
        link: "/admin/users",
      },
      {
        name: "Add User",
        link: "/admin/users/add-user",
      },
      {
        name: "Profile",
        link: "/admin/users/profile",
      },
    ],
  },
];
