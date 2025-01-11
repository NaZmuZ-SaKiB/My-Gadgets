import { mobileBottombar } from "@/constants/mobileBottombar";
import Link from "next/link";

const MobileBottombar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex border-t bg-white xl:hidden">
      {mobileBottombar.map((item) => (
        <Link
          href={item.link}
          key={`bottombar-${item.name}`}
          className="flex flex-1 flex-col items-center gap-1 p-2"
        >
          <item.icon className="size-5" />
          <span className="text-center text-xs">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default MobileBottombar;
