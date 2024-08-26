import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type TProps = {
  defaultValue: boolean;
  label?: string;
  handleChange: (checked?: boolean) => void;
  loading?: boolean;
  className?: string;
};

const MGSwitch = ({
  defaultValue,
  label,
  handleChange,
  loading,
  className,
}: TProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {label && <label className="text-sm text-slate-800">{label}</label>}
      <Switch
        type="button"
        disabled={loading}
        defaultChecked={defaultValue}
        onCheckedChange={handleChange}
        className="data-[state=checked]:bg-primary disabled:!bg-yellow-500"
      />
    </div>
  );
};

export default MGSwitch;
