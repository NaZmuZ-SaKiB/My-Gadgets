import { images } from "@/constants";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

const branchesData = [
  {
    id: 1,
    name: "Dhanmondi",
    address: "House 1, Road 1, Dhanmondi, Dhaka",
    phone: "+880 123 456 7890",
  },

  {
    id: 2,
    name: "Gulshan",
    address: "House 2, Road 2, Gulshan, Dhaka",
    phone: "+880 123 456 7890",
  },

  {
    id: 3,
    name: "Banani",
    address: "House 3, Road 3, Banani, Dhaka",
    phone: "+880 123 456 7890",
  },

  {
    id: 4,
    name: "Uttara",
    address: "House 4, Road 4, Uttara, Dhaka",
    phone: "+880 123 456 7890",
  },
];

const Footer = () => {
  return (
    <div className="border-t border-slate-300 py-8">
      <footer className="container">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-3 gap-y-8 max-md:place-items-center">
          {/* Column 1 */}
          <div className="w-full">
            <div className="mb-6">
              <Image
                src={images.logo}
                alt="logo"
                width={200}
                height={200}
                className="max-sm:mx-auto max-w-[200px]"
              />
            </div>
            <p className="text-slate-500 text-lg font-semibold mb-10 max-sm:text-center lg:max-w-[90%] xl:max-w-[70%]">
              Awesome Gadgets store. We sell Official IT products.
            </p>
            <p className="flex flex-wrap items-center gap-2 text-slate-500 max-sm:justify-center">
              <Mail className="text-primary-1" />
              <span className="font-semibold">Email:</span>
              <span>sakibnazmuz01@gmail.com</span>
            </p>
            <p className="flex items-center gap-2 text-slate-500 mt-3 max-sm:justify-center">
              <Clock className="text-primary-1" />
              <span className="font-semibold">Hours:</span>
              <span>10:00AM - 8:00PM</span>
            </p>
          </div>

          {/* Column 2 */}
          <div className="w-full md:col-span-3 2xl:col-span-2 md:order-2 2xl:order-none">
            <h3 className="text-xl font-bold text-slate-700 max-sm:text-center">
              Branches
            </h3>
            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-2 gap-3 max-sm:text-center">
              {branchesData.map((branch) => (
                <div key={`footer-branch-${branch.id}`} className="">
                  <h4 className="font-semibold mb-1 text-slate-700">
                    {branch.name}
                  </h4>
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
          </div>

          {/* Column 3 */}
          <div className="md:ml-10 w-full max-sm:text-center">
            <h3 className="text-xl font-bold text-slate-700">Quick Links</h3>
            <ul className="text-slate-500 mt-6">
              <li className="mb-2">Shop</li>
              <li className="mb-2">Contact</li>
              <li className="mb-2">About Us</li>
              <li className="mb-2">Privacy Policy</li>
              <li className="mb-2">Emi Terms</li>
              <li className="mb-2">Refund & Return Policy</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="w-full max-sm:text-center">
            <h3 className="text-xl font-bold text-slate-700">For Query</h3>
            <p className="mt-6 text-slate-500">
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
    </div>
  );
};

export default Footer;
