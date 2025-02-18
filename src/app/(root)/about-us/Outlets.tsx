import Link from "next/link";
import { MapPin, MapPinned, Phone } from "lucide-react";

import { TBranch } from "@/types/branch.type";
import { branchGetAllAction } from "@/lib/actions/branch.action";

const Outlets = async () => {
  const branchesData = await branchGetAllAction("limit=999&sortOrder=asc");
  const branches: TBranch[] = branchesData.data || [];

  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-2">
      {branches.map((branch) => (
        <div
          key={`${branch._id}`}
          className="rounded-xl bg-slate-100 px-6 py-5"
        >
          <h3 className="mb-2 text-lg font-semibold text-slate-700 md:text-xl">
            {branch.name}
          </h3>
          <p className="flex items-center gap-1 text-slate-500 max-md:text-sm">
            <MapPin className="size-4" />
            <span>{branch.address}</span>
          </p>
          <p className="mt-2 flex items-center gap-1 text-slate-500 max-md:text-sm">
            <Phone className="size-4" />
            <span>{branch.phone}</span>
          </p>
          <p className="mt-2 flex items-center gap-1 text-slate-500 max-md:text-sm">
            <MapPinned className="size-4" />
            <Link
              href={branch?.mapLink ?? "#"}
              className="hover:text-green-600"
            >
              <span className="hidden sm:block">{branch?.mapLink}</span>
              <span className="sm:hidden">View on map</span>
            </Link>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Outlets;
