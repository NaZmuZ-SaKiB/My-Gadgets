"use client";

import { AQTags, images } from "@/constants";
import Image from "next/image";
import ASidebarDrawer from "./ASidebarDrawer";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { useSignOutMutation } from "@/lib/queries/auth.query";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const ATopbar = () => {
  const { mutateAsync: logoutFn } = useSignOutMutation();

  const queryClient = useQueryClient();

  const router = useRouter();

  const logout = async () => {
    await logoutFn();

    queryClient.invalidateQueries({
      queryKey: [AQTags.USER, AQTags.CURRENT_USER, AQTags.IS_USER_LOGGED_IN],
      exact: false,
    });

    router.push("/sign-in");
  };

  return (
    <div className="flex items-center justify-between gap-5 bg-slate-800 px-4 py-3">
      <div className="flex items-center gap-3">
        <ASidebarDrawer />
        <Link href="/">
          <Image
            src={images.logoWhite.src}
            alt="My Gadgets"
            width={35}
            height={35}
          />
        </Link>
      </div>

      <span className="hidden text-lg font-semibold uppercase text-slate-50 sm:block">
        MG Admin Panel
      </span>

      <div className="flex items-center gap-3 text-sm">
        <Link
          href="/admin/users/profile"
          className="flex items-center gap-1 text-slate-50"
        >
          <User className="size-5" />
          <span>Profile</span>
        </Link>

        <div
          className="flex cursor-pointer items-center gap-1 text-slate-50"
          onClick={logout}
        >
          <LogOut className="size-5" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default ATopbar;
