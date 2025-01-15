"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import DataSearchBox from "@/components/admin/shared/filters/DataSearchBox";
import ImageGallery from "./ImageGallery";
import { useState } from "react";
import { TMedia } from "@/types/media.type";
import Image from "next/image";
import ImageEditForm from "./ImageEditForm";

const MediaData = () => {
  const [selectedImage, setSelectedImage] = useState<TMedia | null>(null);

  return (
    <div className="flex items-start gap-4">
      <div>
        <AFloatingBox className="mb-5">
          <DataSearchBox />
        </AFloatingBox>
        <ImageGallery
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      </div>

      {selectedImage && (
        <AFloatingBox className="flex min-w-[300px] flex-col gap-3">
          <div className="mx-auto">
            <Image
              src={selectedImage.secureUrl}
              width={150}
              height={150}
              alt={selectedImage.name}
              className="object-contain"
            />
          </div>
          <ImageEditForm selectedImage={selectedImage} />
        </AFloatingBox>
      )}
    </div>
  );
};

export default MediaData;
