import { images } from "@/constants";
import Image from "next/image";
import ASidebarDrawer from "./ASidebarDrawer";

const ATopbar = () => {
  return (
    <div className="px-4 py-3 flex gap-5 items-center justify-between bg-slate-800">
      <div className="flex gap-3 items-center">
        <ASidebarDrawer />
        <Image
          src={images.logoWhite.src}
          alt="My Gadgets"
          width={35}
          height={35}
        />
      </div>
    </div>
  );
};

export default ATopbar;
