import { icons } from "@/constants";
import { branchGetAllAction } from "@/lib/actions/branch.action";
import { settingsGetAction } from "@/lib/actions/settings.action";
import { TBranch } from "@/types/branch.type";
import { TFooterSettings, TSocialSettings } from "@/types/settings.type";
import { MapPin, MapPinned, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ContactPage = async () => {
  const branchesData = await branchGetAllAction("limit=999&sortOrder=asc");
  const branches: TBranch[] = branchesData.data || [];

  const settings = await settingsGetAction("footer");
  const footerData: TFooterSettings = settings?.data?.footer;

  const settings2 = await settingsGetAction("social");
  const social: TSocialSettings = settings2?.data?.social;

  return (
    <div className="mg-container">
      <h2 className="mt-10 text-center text-3xl font-bold text-slate-700">
        Find Us
      </h2>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {branches.map((branch) => (
          <div
            key={`${branch._id}`}
            className="rounded-xl bg-slate-100 px-6 py-5"
          >
            <h3 className="mb-2 text-xl font-semibold text-slate-700">
              {branch.name}
            </h3>
            <p className="flex items-center gap-1 text-slate-500">
              <MapPin className="size-4" />
              <span>{branch.address}</span>
            </p>
            <p className="mt-2 flex items-center gap-1 text-slate-500">
              <Phone className="size-4" />
              <span>{branch.phone}</span>
            </p>
            <p className="mt-2 flex items-center gap-1 text-slate-500">
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

      <h2 className="mt-10 text-center text-3xl font-bold text-slate-700">
        Call Us
      </h2>

      <div className="pb-10 pt-5 text-center">
        <div
          dangerouslySetInnerHTML={{ __html: footerData?.contact }}
          className="flex flex-col gap-2 leading-6 text-slate-700"
        />
      </div>

      <h2 className="text-center text-3xl font-bold text-slate-700">
        Social Media
      </h2>

      <div className="my-10 flex flex-wrap items-center justify-center gap-10">
        {(Object.keys(social) as (keyof TSocialSettings)[]).map(
          (item) =>
            social[item] && (
              <Link
                href={social[item]}
                key={`footer-social-icon-${item}`}
                className=""
              >
                <Image
                  src={icons[item].src}
                  alt={item}
                  width={100}
                  height={100}
                  className=""
                />
              </Link>
            ),
        )}
      </div>
    </div>
  );
};

export default ContactPage;
