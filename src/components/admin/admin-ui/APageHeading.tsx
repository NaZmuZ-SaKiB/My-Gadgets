"use client";

import { ClassValue } from "clsx";
import AFloatingBox from "./AFloatingBox";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

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
          <span className="pr-2 cursor-pointer" onClick={() => router.back()}>
            <ChevronLeft className="size-7" />
          </span>
        )}
        <h1 className={cn("text-gray-700 font-bold text-xl", className)}>
          {title}
        </h1>
      </div>
      {children}
    </AFloatingBox>
  );
};

export default APageHeading;
