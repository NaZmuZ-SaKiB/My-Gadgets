"use client";

import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

import UploadImageButton from "./UploadImageButton";
import MGPagination from "@/components/global/shared/MGPagination";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import DataLimitSelect from "@/components/admin/shared/filters/DataLimitSelect";

import { useMediaGetAllQuery } from "@/lib/queries/media.query";
import { TMedia } from "@/types/media.type";
import { cn } from "@/lib/utils";

type TProps = {
  selectedImage: TMedia | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<TMedia | null>>;
};

const ImageGallery = ({ selectedImage, setSelectedImage }: TProps) => {
  const searchParams = useSearchParams();

  const { data, isLoading } = useMediaGetAllQuery(
    `${searchParams.toString()}&limit=35`,
  );

  if (isLoading) {
    return (
      <AFloatingBox className="grid h-[400px] place-items-center">
        <Loader2 className="mx-auto size-[50px] animate-spin text-primary" />
      </AFloatingBox>
    );
  }
  return (
    <AFloatingBox>
      <div className="flex flex-wrap gap-3 max-sm:justify-center">
        <UploadImageButton />
        {data?.data?.map((image: TMedia) => (
          <div
            key={image._id}
            className={cn(
              "aspect-square size-[128px] cursor-pointer overflow-hidden rounded-lg border border-slate-300 bg-slate-100",
              {
                "border-2 border-primary": selectedImage?._id === image._id,
              },
            )}
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.secureUrl}
              width={128}
              height={128}
              alt={image.name}
              className="size-full object-contain"
            />
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-3 sm:justify-between">
        <div className="max-sm:hidden">
          <DataLimitSelect defaultValue="35" />
        </div>
        <MGPagination
          admin
          limit={data?.meta?.limit as number}
          page={data?.meta?.page as number}
          total={data?.meta?.total as number}
        />
      </div>
    </AFloatingBox>
  );
};

export default ImageGallery;
