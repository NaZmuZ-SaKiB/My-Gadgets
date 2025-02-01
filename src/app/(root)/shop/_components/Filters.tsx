import RangeFilter from "./RangeFilter";
import CheckBoxFilterCard from "./CheckBoxFilterCard";
import DropDownFilterCard from "./DropDownFilterCard";

import { compatibilities, connectivities } from "@/constants";

const Filters = () => {
  return (
    <div className="flex flex-col gap-3">
      <RangeFilter field="Price" min={0} max={300000} step={500} />
      <DropDownFilterCard />
      <CheckBoxFilterCard items={connectivities} field="connectivity" />
      <CheckBoxFilterCard items={compatibilities} field="compatibility" />
      <RangeFilter field="Camera" min={0} max={200} />
      <RangeFilter field="DisplaySize" min={0} max={27} step={0.5} />
      <RangeFilter field="Weight" min={0} max={10} step={0.5} />
    </div>
  );
};

export default Filters;
