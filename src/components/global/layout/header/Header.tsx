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

const font = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
});

const Header = () => {
  return (
    <>
      <div className="bg-white border-b header max-xl:sticky top-0 z-[100]">
        <header className="mg-container py-2 xl:py-3">
          <div className="flex gap-10 items-center justify-between">
            <MobileMenu />

            <Link
              href="/"
              className="shrink-0 max-xl:absolute left-[50%] transform max-xl:-translate-x-[50%] flex items-center gap-2"
            >
              <Image
                src={images.logo}
                className="max-sm:size-8 max-xl:h-10 max-w-10"
                alt="logo"
              />
              <span
                className={cn(
                  font.className,
                  "font-semibold text-xl sm:text-2xl"
                )}
              >
                My Gadgets
              </span>
            </Link>

            {/* search box */}
            <div className="xl:flex xl:justify-center xl:flex-1 max-xl:absolute z-50 left-0 right-0 top-[53px] xl:static">
              <input hidden type="checkbox" id="search-toggle" />
              <SearchBox />
            </div>

            {/* links */}
            <div className="flex items-center gap-6">
              <Link
                href="/compare"
                className="hidden xl:block text-slate-600 hover:text-slate-800 cursor-pointer"
              >
                <Image
                  src={icons.compare}
                  alt="compare"
                  className="size-6 mx-auto"
                />
                <span className="text-sm">Compare</span>
              </Link>

              <Link
                href="/wishlist"
                className="hidden xl:block text-slate-600 hover:text-slate-800 cursor-pointer"
              >
                <Image
                  src={icons.heart}
                  alt="wishlist"
                  className="size-6 mx-auto"
                />
                <span className="text-sm">Wishlist</span>
              </Link>

              <div className="shrink-0 xl:hidden">
                <label htmlFor="search-toggle">
                  <Search className="h-6" />
                </label>
              </div>

              <div className="shrink-0 text-slate-600 hover:text-slate-800 cursor-pointer">
                <Cart />
              </div>

              <div className="hidden xl:block text-slate-600 hover:text-slate-800 cursor-pointer">
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
