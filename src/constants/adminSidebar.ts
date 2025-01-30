import {
  Images,
  LayoutDashboard,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Store,
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
        name: "Brands",
        link: "/admin/brands",
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
        name: "Add Admin",
        link: "/admin/users/add-admin",
      },
      {
        name: "Profile",
        link: "/admin/users/profile",
      },
    ],
  },
  {
    name: "Store",
    icon: Store,
    link: "",
    hasSubMenu: true,
    subMenus: [
      {
        name: "Branches",
        link: "/admin/branches",
      },
    ],
  },
  {
    name: "Settings",
    link: "",
    hasSubMenu: true,
    icon: Settings,
    subMenus: [
      {
        name: "Homepage",
        link: "/admin/settings/homepage",
      },
      {
        name: "Category",
        link: "/admin/settings/category",
      },
      {
        name: "Footer",
        link: "/admin/settings/footer",
      },
      {
        name: "Social",
        link: "/admin/settings/social",
      },
    ],
  },
];
