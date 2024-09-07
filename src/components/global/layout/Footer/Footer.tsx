import { images } from "@/constants";
import { settingsGetAction } from "@/lib/actions/settings.action";
import { TFooterSettings } from "@/types/settings.type";
import { Clock, Mail } from "lucide-react";
import Image from "next/image";

const Footer = async () => {
  const settings = await settingsGetAction();
  const footerData: TFooterSettings = settings?.data?.footer;

  return (
    <div className="border-t border-slate-300 pt-8 mt-4">
      <footer className="container">
        <div className="flex flex-col md:flex-row gap-x-4 gap-y-6">
          {/* Column 1 */}
          <div className="w-full">
            <div className="mb-5">
              <Image
                src={images.logo}
                alt="logo"
                width={100}
                height={100}
                className="max-md:mx-auto max-w-[200px]"
              />
            </div>
            <p className="text-slate-500 text-lg font-semibold mb-5 max-md:text-center lg:max-w-[90%] xl:max-w-[70%]">
              {footerData?.slogan}
            </p>
            <p className="flex flex-wrap items-center gap-2 text-slate-500 max-md:justify-center text-sm">
              <Mail className="size-5 text-primary" />
              <span className="font-semibold">Email:</span>
              <span>{footerData?.email}</span>
            </p>
            <p className="flex items-center gap-2 text-slate-500 mt-3 max-md:justify-center text-sm">
              <Clock className="size-5 text-primary" />
              <span className="font-semibold">Hours:</span>
              <span>{footerData?.hours}</span>
            </p>
          </div>

          {/* Column 2 */}
          <div className="md:ml-10 w-full max-md:text-center">
            <h3 className="text-xl font-bold text-slate-700">Quick Links</h3>
            <ul className="text-slate-500 mt-3 md:mt-6 space-y-2">
              <li>Shop</li>
              <li>Contact</li>
              <li>About Us</li>
              <li>Privacy Policy</li>
              <li>Emi Terms</li>
              <li>Refund & Return Policy</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="w-full max-md:text-center">
            <h3 className="text-xl font-bold text-slate-700">For Query</h3>
            <div
              dangerouslySetInnerHTML={{ __html: footerData?.contact }}
              className="mt-3 flex flex-col text-sm gap-2 text-slate-700 leading-6"
            />
          </div>
        </div>
      </footer>
      <div>
        <hr className="border-slate-300 mt-8" />
        <p className="text-slate-500 px-2 py-4 text-center text-sm">
          © 2024 My Gadgets. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
