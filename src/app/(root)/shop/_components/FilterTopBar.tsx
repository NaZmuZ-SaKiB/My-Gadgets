import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterTopBar = () => {
  return (
    <div className="flex justify-center md:justify-end flex-wrap gap-2 border border-slate-300 rounded-xl px-3 py-1.5">
      {/* <FilterSidebar /> */}

      <div className="max-xs:hidden inline-flex items-center py-1.5 text-slate-500">
        <span className="font-semibold text-sm">Show:</span>
        <Select defaultValue="35">
          <SelectTrigger className="h-auto border-none p-0 px-1 no-focus bg-slate-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="35">35</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="75">75</SelectItem>
            <SelectItem value="90">90</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="inline-flex items-center py-1.5 text-slate-500">
        <span className="font-semibold text-sm">Sort By:</span>
        <Select defaultValue="Price Low to High">
          <SelectTrigger className="h-auto w-[90px] border-none p-0 px-1 no-focus bg-slate-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Price Low to High">Price Low to High</SelectItem>
            <SelectItem value="Price High to Low">Price High to Low</SelectItem>
            <SelectItem value="Latest">Latest</SelectItem>
            <SelectItem value="Oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterTopBar;
