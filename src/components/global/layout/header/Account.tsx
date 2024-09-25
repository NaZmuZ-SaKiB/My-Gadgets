"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { icons } from "@/constants";
import { LogOut, ShoppingBag, User } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Account = () => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="no-focus">
        <Image src={icons.user} alt="account" className="size-6 mx-auto" />
        <span className="text-sm">Account</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Nazmuz Sakib</DropdownMenuLabel>

        <DropdownMenuItem className="gap-2">
          <span>
            <User className="size-4" />
          </span>
          <Link href="/account" className="w-full">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <span>
            <ShoppingBag className="size-4" />
          </span>
          <Link href="/account/orders" className="w-full">
            My Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2 cursor-pointer">
          <span>
            <LogOut className="size-4" />
          </span>
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Account;
