import { compatibilities, connectivities } from "@/constants";
import CheckBoxFilterCard from "./CheckBoxFilterCard";
import DropDownFilterCard from "./DropDownFilterCard";
import RangeFilter from "./RangeFilter";

const Filters = () => {
  return (
    <div className="flex flex-col gap-3">
      <RangeFilter field="price" min={0} max={300000} step={500} />
      <DropDownFilterCard />
      <CheckBoxFilterCard items={connectivities} field="connectivity" />
      <CheckBoxFilterCard items={compatibilities} field="compatibility" />
      <RangeFilter field="camera" min={0} max={200} />
      <RangeFilter field="displaySize" min={0} max={27} step={0.5} />
      <RangeFilter field="weight" min={0} max={5} step={0.5} />
    </div>
  );
};

export default Filters;
