import { images } from "@/constants";
import Image from "next/image";

const ATopbar = () => {
  return (
    <div className="px-4 py-3 flex gap-5 items-center justify-between bg-slate-800">
      <div className="">
        <Image
          src={images.logoWhite.src}
          alt="My Gadgets"
          width={35}
          height={35}
        />
      </div>
      <h1 className="font-bold text-3xl text-slate-50">
        MY GADGETS ADMIN PANEL
      </h1>
    </div>
  );
};

export default ATopbar;
