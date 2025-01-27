import { branchGetAllAction } from "@/lib/actions/branch.action";
import { TBranch } from "@/types/branch.type";
import { MapPin, Phone } from "lucide-react";

const BranchesSection = async () => {
  const branchesData = await branchGetAllAction("limit=999&sortOrder=asc");
  const branches: TBranch[] = branchesData.data || [];

  return (
    <section className="pb-4 pt-4 md:pt-6">
      <h2 className="text-3xl font-bold text-slate-700">Outlets</h2>

      <div className="mt-6 flex flex-wrap justify-between gap-4">
        {branches.map((branch) => (
          <div
            key={`${branch._id}`}
            className="flex-1 basis-[250px] rounded-xl bg-slate-100 px-5 py-3"
          >
            <h3 className="mb-2 text-xl font-semibold text-slate-700">
              {branch.name}
            </h3>
            <p className="flex items-center gap-1 text-slate-500 sm:text-sm">
              <MapPin className="size-4" />
              <span>{branch.address}</span>
            </p>
            <p className="mt-2 flex items-center gap-1 text-slate-500 sm:text-sm">
              <Phone className="size-4" />
              <span>{branch.phone}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BranchesSection;
