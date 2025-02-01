import Link from "next/link";
import { Home } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

type TProps = {
  items: {
    label: string;
    link?: string | null;
  }[];
};

const BreadcrumbBar = ({ items }: TProps) => {
  return (
    <Breadcrumb className="overflow-hidden sm:rounded-xl sm:border sm:border-slate-200 sm:p-3">
      <BreadcrumbList className="flex-nowrap">
        <BreadcrumbItem className="text-primary">
          <Link href="/">
            <Home className="size-5" />
          </Link>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {items.map((item, i) => {
          const DinamicTag = item.link ? Link : "span";
          return (
            <Fragment key={`breadcrumb-item-${item.label}-${i}`}>
              <BreadcrumbItem
                className={cn("overflow-hidden font-semibold text-primary", {
                  "text-slate-500": !item.link,
                  "shrink-0": i < items.length - 1,
                })}
              >
                <DinamicTag
                  href={item.link as string}
                  className={cn({
                    "overflow-hidden text-ellipsis whitespace-nowrap md:max-w-[300px]":
                      i === items.length - 1,
                  })}
                >
                  {item.label}
                </DinamicTag>
              </BreadcrumbItem>
              {i < items.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbBar;
