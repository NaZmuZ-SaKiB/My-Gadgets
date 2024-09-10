import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";

type TProps = {
  items: {
    label: string;
    link?: string;
  }[];
};

const BreadcrumbBar = ({ items }: TProps) => {
  return (
    <Breadcrumb className="sm:p-3 sm:border sm:border-slate-200 sm:rounded-xl overflow-hidden">
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
                className={cn("text-primary font-semibold overflow-hidden", {
                  "text-slate-500": i === items.length - 1,
                  "shrink-0": i < items.length - 1,
                })}
              >
                <DinamicTag
                  href={item?.link ?? ""}
                  className={cn({
                    "whitespace-nowrap overflow-hidden text-ellipsis md:max-w-[300px]":
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
