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
  return (
    <div className="rounded-xl border border-slate-200 p-3">
      <p className="text-sm mb-2 font-semibold text-slate-700">
        Operating System
      </p>
      <Select>
        <SelectTrigger className="no-focus">
          <SelectValue placeholder="Operating System" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {operatingSystemOptions.map((os) => (
            <SelectItem key={`filter-os-${os}`} value={os.value}>
              {os.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <p className="text-sm mt-3 mb-2 font-semibold text-slate-700">
        Power Source
      </p>
      <Select>
        <SelectTrigger className="no-focus">
          <SelectValue placeholder="Power Source" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {powerSourceOptions.map((ps) => (
            <SelectItem key={`filter-ps-${ps}`} value={ps.label}>
              {ps.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <p className="text-sm mt-3 mb-2 font-semibold text-slate-700">
        Charging Port
      </p>
      <Select>
        <SelectTrigger className="no-focus">
          <SelectValue placeholder="Power Source" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {chargingPortOptions.map((cp) => (
            <SelectItem key={`filter-cp-${cp}`} value={cp.label}>
              {cp.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DropDownFilterCard;
