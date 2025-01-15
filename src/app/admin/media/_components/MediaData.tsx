"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import DataSearchBox from "@/components/admin/shared/filters/DataSearchBox";
import ImageGallery from "./ImageGallery";
import { useState } from "react";
import { TMedia } from "@/types/media.type";

const MediaData = () => {
  const [selectedImage, setSelectedImage] = useState<TMedia | null>(null);

  return (
    <div className="flex gap-4">
      <div>
        <AFloatingBox className="mb-5">
          <DataSearchBox />
        </AFloatingBox>
        <ImageGallery
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      </div>

      {selectedImage && <AFloatingBox></AFloatingBox>}
    </div>
  );
};

export default MediaData;
