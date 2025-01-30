import { icons, socialItems } from "@/constants";
import { settingsGetAction } from "@/lib/actions/settings.action";
import { TFooterSettings } from "@/types/settings.type";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

const SocialLinks = async () => {
  const settings = await settingsGetAction("social");
  const socialSettings: TFooterSettings = settings?.data?.social;

  return (
    <div className="flex items-center gap-2">
      {(socialItems as (keyof TFooterSettings)[]).map(
        (item) =>
          socialSettings[item] && (
            <Link
              href={socialSettings[item]}
              key={`footer-social-icon-${item}`}
              className=""
            >
              <Image
                src={icons[item].src}
                alt={item}
                width={100}
                height={100}
                className="size-[25px]"
              />
            </Link>
          ),
      )}
    </div>
  );
};

export default SocialLinks;
