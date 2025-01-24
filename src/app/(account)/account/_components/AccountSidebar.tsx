"use client";

import { accountSideBar } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AccountSidebar = () => {
  const pathName = usePathname();

  return (
    <div className="flex justify-center gap-3 max-sm:flex-wrap lg:flex-col">
      {accountSideBar.map((item) => (
        <Link
          key={item.link}
          href={item.link}
          className={cn(
            "flex cursor-pointer items-center rounded-lg border border-slate-200 px-1 py-1 max-sm:flex-1 max-sm:basis-[200px] max-xs:basis-[150px] sm:px-2",
            {
              group: pathName !== item.link,
              "bg-primary text-white [&>*]:text-white": pathName === item.link,
            },
          )}
        >
          <span className="p-2 text-slate-500 group-hover:text-primary-hover max-sm:hidden">
            <item.icon />
          </span>
          <span className="p-2 text-sm font-semibold text-slate-700 group-hover:text-primary-hover">
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default AccountSidebar;
