import { images } from "@/constants";
import { cn } from "@/lib/utils";
import { Permanent_Marker } from "next/font/google";
import Image from "next/image";

const font = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
});

const MainLoading = () => {
  return (
    <div className="grid min-h-[95svh] place-items-center">
      <div className="flex items-center gap-2">
        <Image
          src={images.logo}
          className="max-w-10 max-xl:h-10 max-sm:size-8"
          alt="logo"
        />
        <span
          className={cn(font.className, "text-xl font-semibold sm:text-2xl")}
        >
          My Gadgets
        </span>
      </div>
    </div>
  );
};

export default MainLoading;
