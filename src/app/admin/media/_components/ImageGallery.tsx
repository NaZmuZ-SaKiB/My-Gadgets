"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import { useMediaGetAllQuery } from "@/lib/queries/media.query";
import { TMedia } from "@/types/media.type";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import UploadImageButton from "./UploadImageButton";

const ImageGallery = () => {
  const params = new URLSearchParams();
  params.append("limit", "30");

  const { data, isLoading } = useMediaGetAllQuery(params.toString());

  if (isLoading) {
    return (
      <AFloatingBox className="grid place-items-center h-[400px]">
        <Loader2 className="animate-spin mx-auto size-[50px] text-primary" />
      </AFloatingBox>
    );
  }
  return (
    <AFloatingBox>
      <div className="flex max-sm:justify-center gap-3 flex-wrap">
        <UploadImageButton />
        {data?.data?.map((image: TMedia) => (
          <div
            key={image._id}
            className="aspect-square border border-slate-300 bg-slate-100 rounded-lg overflow-hidden cursor-pointer size-[128px]"
          >
            <Image
              src={image.secureUrl}
              width={128}
              height={128}
              alt={image.name}
              className="size-full object-cover"
            />
          </div>
        ))}
      </div>
    </AFloatingBox>
  );
};

export default ImageGallery;
