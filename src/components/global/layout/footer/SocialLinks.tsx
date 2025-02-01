import Link from "next/link";
import Image from "next/image";

import { settingsGetAction } from "@/lib/actions/settings.action";
import { TSocialSettings } from "@/types/settings.type";
import { icons } from "@/constants";

const SocialLinks = async () => {
  const settings = await settingsGetAction("social");
  const socialSettings: TSocialSettings = settings?.data?.social;

  return (
    <div className="flex items-center gap-2">
      {(Object.keys(socialSettings) as (keyof TSocialSettings)[]).map(
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
