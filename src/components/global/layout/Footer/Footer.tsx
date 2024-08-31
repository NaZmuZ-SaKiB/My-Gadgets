import { images } from "@/constants";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="border-t border-slate-300 pt-8">
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
              Awesome Gadgets store. We sell Official IT products.
            </p>
            <p className="flex flex-wrap items-center gap-2 text-slate-500 max-md:justify-center text-sm">
              <Mail className="size-5 text-primary" />
              <span className="font-semibold">Email:</span>
              <span>sakibnazmuz01@gmail.com</span>
            </p>
            <p className="flex items-center gap-2 text-slate-500 mt-3 max-md:justify-center text-sm">
              <Clock className="size-5 text-primary" />
              <span className="font-semibold">Hours:</span>
              <span>10:00AM - 8:00PM</span>
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
            <p className="mt-3 md:mt-6 text-slate-500">
              <span className="font-semibold text-slate-700">Laptop:</span>{" "}
              <br className="xs:hidden" />
              <span>+8801324472632, +8801763548393</span>
            </p>
            <p className="mt-2 text-slate-500">
              <span className="font-semibold text-slate-700">Desktop:</span>{" "}
              <br className="xs:hidden" />
              <span>+880187362798, +8801763873625</span>
            </p>
            <p className="mt-2 text-slate-500">
              <span className="font-semibold text-slate-700">Accessories:</span>{" "}
              <br className="xs:hidden" />
              <span>+8801884736273, +8801738746254</span>
            </p>
            <p className="mt-2 text-slate-500">
              <span className="font-semibold text-slate-700">Warranty:</span>{" "}
              <br className="xs:hidden" />
              <span>+8801372837463</span>
            </p>
            <p className="mt-2 text-slate-500">
              <span className="font-semibold text-slate-700">
                EMI, Refund, Return:
              </span>{" "}
              <br className="xs:hidden" />
              <span>+8801362740983</span>
            </p>
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
