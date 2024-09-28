"use client";

import { accountSideBar } from "@/constants/accountSidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AccountSidebar = () => {
  const pathName = usePathname();

  return (
    <div className="space-y-3">
      {accountSideBar.map((item) => (
        <Link
          key={item.link}
          href={item.link}
          className={cn(
            "px-2 py-1 flex items-center border border-slate-200 rounded-lg cursor-pointer",
            {
              group: pathName !== item.link,
              "bg-primary text-white [&>*]:text-white": pathName === item.link,
            }
          )}
        >
          <span className="p-2 text-slate-500 group-hover:text-primary-hover">
            <item.icon />
          </span>
          <span className="p-2 text-sm text-slate-700 font-semibold group-hover:text-primary-hover">
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default AccountSidebar;
