"use client";

import { ClassValue } from "clsx";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import AFloatingBox from "./AFloatingBox";

import { cn } from "@/lib/utils";

type TProps = {
  title: string;
  className?: ClassValue;
  children?: React.ReactNode;
  backButton?: boolean;
};

const APageHeading = ({
  title,
  className,
  children,
  backButton = false,
}: TProps) => {
  const router = useRouter();
  return (
    <AFloatingBox className="flex justify-between">
      <div className="flex items-center">
        {backButton && (
          <span className="cursor-pointer pr-2" onClick={() => router.back()}>
            <ChevronLeft className="size-7" />
          </span>
        )}
        <h1 className={cn("text-xl font-bold text-slate-700", className)}>
          {title}
        </h1>
      </div>
      {children}
    </AFloatingBox>
  );
};

export default APageHeading;
