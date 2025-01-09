"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const options = ["all", "admin", "user"];

const UserRoleFilter = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const handleChange = (value: string) => {
    params.delete("role");
    params.delete("page");
    params.append("page", "1");
    if (value !== "all") {
      params.append("role", value);
    }

    router.replace(`${pathName}?${params}`);
  };
  return (
    <Select defaultValue="all" onValueChange={(value) => handleChange(value)}>
      <SelectTrigger className="no-focus w-[150px] gap-2 border-slate-200">
        <SelectValue placeholder="Role" />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={`data-sort-by-${option}`}
            value={option}
            className="capitalize"
          >
            Role: {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default UserRoleFilter;
