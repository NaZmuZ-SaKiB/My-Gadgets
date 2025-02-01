import { Heart, Home, ShoppingCart, Shuffle, User } from "lucide-react";

export type TMobileBottombar = {
  name: string;
  icon: any;
  link: string;
};

export const mobileBottombar: TMobileBottombar[] = [
  {
    name: "Shop",
    icon: ShoppingCart,
    link: "/shop",
  },
  { name: "Wishlist", icon: Heart, link: "/wishlist" },
  { name: "Home", icon: Home, link: "/" },
  { name: "Compare", icon: Shuffle, link: "/compare" },
  { name: "Acount", icon: User, link: "/account" },
];
