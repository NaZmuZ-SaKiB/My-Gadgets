import { Heart, Home, Shuffle, User, Wallet } from "lucide-react";

export type TMobileBottombar = {
  name: string;
  icon: any;
  link: string;
};

export const mobileBottombar: TMobileBottombar[] = [
  {
    name: "Checkout",
    icon: Wallet,
    link: "/checkout",
  },
  { name: "Wishlist", icon: Heart, link: "/wishlist" },
  { name: "Home", icon: Home, link: "/" },
  { name: "Compare", icon: Shuffle, link: "/compare" },
  { name: "Acount", icon: User, link: "/account" },
];
