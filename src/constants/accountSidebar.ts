import { Lock, MapPin, ShoppingBag, User } from "lucide-react";

export type TAccountSideBar = {
  name: string;
  icon?: any;
  link: string;
};

export const accountSideBar: TAccountSideBar[] = [
  {
    name: "Profile",
    icon: User,
    link: "/account",
  },
  {
    name: "Orders",
    icon: ShoppingBag,
    link: "/account/orders",
  },
  {
    name: "Addresses",
    icon: MapPin,
    link: "/account/addresses",
  },
  {
    name: "Change Password",
    icon: Lock,
    link: "/account/change-password",
  },
];
