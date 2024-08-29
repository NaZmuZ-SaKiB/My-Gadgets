import { images } from "@/constants";
import Image from "next/image";
import ASidebarDrawer from "./ASidebarDrawer";
import Link from "next/link";

const ATopbar = () => {
  return (
    <div className="px-4 py-3 flex gap-5 items-center justify-between bg-slate-800">
      <div className="flex gap-3 items-center">
        <ASidebarDrawer />
        <Link href="/">
          <Image
            src={images.logoWhite.src}
            alt="My Gadgets"
            width={35}
            height={35}
          />
        </Link>
      </div>
    </div>
  );
};

export default ATopbar;
