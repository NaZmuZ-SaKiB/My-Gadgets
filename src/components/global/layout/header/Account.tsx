"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AQTags, icons } from "@/constants";
import {
  useCurrentUserQuery,
  useSignOutMutation,
} from "@/lib/queries/auth.query";
import { useQueryClient } from "@tanstack/react-query";
import { LogIn, LogOut, ShoppingBag, User, UserCircle } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Account = () => {
  const [open, setOpen] = useState(false);

  const { data: user } = useCurrentUserQuery();

  const { mutateAsync: logoutFn } = useSignOutMutation();

  const router = useRouter();

  const queryClient = useQueryClient();

  const logout = async () => {
    await logoutFn();

    queryClient.clear();

    router.push("/");
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="no-focus cursor-pointer">
        <Image src={icons.user} alt="account" className="mx-auto size-6" />
        <span className="text-sm">Account</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {user ? (
          <>
            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
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
            <DropdownMenuItem className="cursor-pointer gap-2" onClick={logout}>
              <span>
                <LogOut className="size-4" />
              </span>
              <span>Logout</span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem className="gap-2">
              <span>
                <LogIn className="size-4" />
              </span>
              <Link href="/sign-in" className="w-full">
                Log in
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <span>
                <UserCircle className="size-4" />
              </span>
              <Link href="/sign-up" className="w-full">
                Create Account
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Account;
