import { branchGetAllAction } from "@/lib/actions/branch.action";
import { TBranch } from "@/types/branch.type";
import { MapPin, Phone } from "lucide-react";

const BranchesSection = async () => {
  const branchesData = await branchGetAllAction("limit=999&sortOrder=asc");
  const branches: TBranch[] = branchesData.data || [];

  return (
    <section className="pt-4 md:pt-6 pb-4">
      <h2 className="font-bold text-3xl text-slate-700">Outlets</h2>

      <div className="mt-6 flex justify-between gap-4 flex-wrap">
        {branches.map((branch) => (
          <div
            key={`${branch._id}`}
            className="flex-1 basis-[250px] bg-slate-100 px-5 py-3 rounded-xl"
          >
            <h3 className="font-semibold text-xl mb-2 text-slate-700">
              {branch.name}
            </h3>
            <p className="text-slate-500 sm:text-sm flex gap-1 items-center max-sm:justify-center">
              <MapPin className="size-4" />
              <span>{branch.address}</span>
            </p>
            <p className="text-slate-500 sm:text-sm flex gap-1 items-center mt-2 max-sm:justify-center">
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
