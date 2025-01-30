import { images } from "@/constants";
import { settingsGetAction } from "@/lib/actions/settings.action";
import { TFooterSettings } from "@/types/settings.type";
import { Clock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = async () => {
  const settings = await settingsGetAction("footer");
  const footerData: TFooterSettings = settings?.data?.footer;

  return (
    <div className="mt-4 border-t border-slate-300 pt-8">
      <footer className="container">
        <div className="flex flex-col gap-x-4 gap-y-6 md:flex-row">
          {/* Column 1 */}
          <div className="w-full">
            <div className="mb-5">
              <Image
                src={images.logo}
                alt="logo"
                width={100}
                height={100}
                className="max-w-[200px] max-md:mx-auto"
              />
            </div>
            <p className="mb-5 text-lg font-semibold text-slate-500 max-md:text-center lg:max-w-[90%] xl:max-w-[70%]">
              {footerData?.slogan}
            </p>
            <p className="flex flex-wrap items-center gap-2 text-sm text-slate-500 max-md:justify-center">
              <Mail className="size-5 text-primary" />
              <span className="font-semibold">Email:</span>
              <span>{footerData?.email}</span>
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-slate-500 max-md:justify-center">
              <Clock className="size-5 text-primary" />
              <span className="font-semibold">Hours:</span>
              <span>{footerData?.hours}</span>
            </p>
          </div>

          {/* Column 2 */}
          <div className="w-full max-md:text-center md:ml-10">
            <h3 className="text-xl font-bold text-slate-700">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-slate-500 md:mt-6">
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/about-us">About Us</Link>
              </li>
              <li>
                <Link href="privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="emi-terms">Emi Terms</Link>
              </li>
              <li>Refund & Return Policy</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="w-full max-md:text-center">
            <h3 className="text-xl font-bold text-slate-700">For Query</h3>
            <div
              dangerouslySetInnerHTML={{ __html: footerData?.contact }}
              className="mt-3 flex flex-col gap-2 text-sm leading-6 text-slate-700"
            />
          </div>
        </div>
      </footer>
      <div>
        <hr className="mt-8 border-slate-300" />
        <p className="px-2 py-4 text-center text-sm text-slate-500">
          © 2024 My Gadgets. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
