import { icons, images } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { Permanent_Marker } from "next/font/google";
import { cn } from "@/lib/utils";
import SearchBox from "./SearchBox";
import { Search } from "lucide-react";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";
import Cart from "./Cart";
import Account from "./Account";
import Compare from "./Compare";
import Wishlist from "./Wishlist";

const font = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
});

const Header = () => {
  return (
    <>
      <div className="header top-0 z-[100] border-b bg-white max-xl:sticky">
        <header className="mg-container py-2 xl:py-3">
          <div className="flex items-center justify-between gap-10">
            <MobileMenu />

            <Link
              href="/"
              className="left-[50%] flex shrink-0 transform items-center gap-2 max-xl:absolute max-xl:-translate-x-[50%]"
            >
              <Image
                src={images.logo}
                className="max-w-10 max-xl:h-10 max-sm:size-8"
                alt="logo"
              />
              <span
                className={cn(
                  font.className,
                  "text-xl font-semibold sm:text-2xl",
                )}
              >
                My Gadgets
              </span>
            </Link>

            {/* search box */}
            <div className="left-0 right-0 top-[53px] z-50 max-xl:absolute xl:static xl:flex xl:flex-1 xl:justify-center">
              <input hidden type="checkbox" id="search-toggle" />
              <SearchBox />
            </div>

            {/* links */}
            <div className="flex items-center gap-6">
              <Compare />

              <Wishlist />

              <div className="shrink-0 xl:hidden">
                <label htmlFor="search-toggle">
                  <Search className="h-6" />
                </label>
              </div>

              <div className="shrink-0 cursor-pointer text-slate-600 hover:text-slate-800">
                <Cart />
              </div>

              <div className="hidden cursor-pointer text-slate-600 hover:text-slate-800 xl:block">
                <Account />
              </div>
            </div>
          </div>
        </header>
      </div>
      <Navbar />
    </>
  );
};

export default Header;
