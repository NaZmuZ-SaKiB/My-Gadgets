"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  chargingPortOptions,
  operatingSystemOptions,
  powerSourceOptions,
} from "@/constants";

const DropDownFilterCard = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const router = useRouter();

  const handleChange = (value: string, field: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete("page");
    params.delete(field);

    params.append("page", "1");
    if (value !== "all") {
      params.append(field, value);
    }

    router.replace(`${pathName}?${params}`);
  };

  return (
    <div className="rounded-xl border border-slate-200 p-3">
      <p className="mb-2 text-sm font-semibold text-slate-700">
        Operating System
      </p>
      <Select
        defaultValue={searchParams.get("os") || "all"}
        onValueChange={(value) => handleChange(value, "os")}
      >
        <SelectTrigger className="no-focus">
          <SelectValue placeholder="Operating System" />
        </SelectTrigger>

        <SelectContent className="z-[120]">
          <SelectItem value="all">All</SelectItem>
          {operatingSystemOptions.map((os) => (
            <SelectItem key={`filter-os-${os.value}`} value={os.value}>
              {os.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <p className="mb-2 mt-3 text-sm font-semibold text-slate-700">
        Power Source
      </p>
      <Select
        defaultValue={searchParams.get("powerSource") || "all"}
        onValueChange={(value) => handleChange(value, "powerSource")}
      >
        <SelectTrigger className="no-focus">
          <SelectValue placeholder="Power Source" />
        </SelectTrigger>

        <SelectContent className="z-[120]">
          <SelectItem value="all">All</SelectItem>
          {powerSourceOptions.map((ps) => (
            <SelectItem key={`filter-ps-${ps.value}`} value={ps.label}>
              {ps.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <p className="mb-2 mt-3 text-sm font-semibold text-slate-700">
        Charging Port
      </p>
      <Select
        defaultValue={searchParams.get("chargingPort") || "all"}
        onValueChange={(value) => handleChange(value, "chargingPort")}
      >
        <SelectTrigger className="no-focus">
          <SelectValue placeholder="Power Source" />
        </SelectTrigger>

        <SelectContent className="z-[120]">
          <SelectItem value="all">All</SelectItem>
          {chargingPortOptions.map((cp) => (
            <SelectItem key={`filter-cp-${cp.value}`} value={cp.label}>
              {cp.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DropDownFilterCard;
