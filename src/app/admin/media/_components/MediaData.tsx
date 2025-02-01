"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

import ImageGallery from "./ImageGallery";
import ImageEditForm from "./ImageEditForm";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import DataSearchBox from "@/components/admin/shared/filters/DataSearchBox";

import { TMedia } from "@/types/media.type";

const MediaData = () => {
  const [selectedImage, setSelectedImage] = useState<TMedia | null>(null);

  return (
    <div className="flex items-start gap-4">
      <div className="w-full">
        <AFloatingBox className="mb-5">
          <DataSearchBox />
        </AFloatingBox>
        <ImageGallery
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      </div>

      {selectedImage && (
        <AFloatingBox className="relative flex min-w-[300px] flex-col gap-3">
          <div
            className="absolute right-0 top-0 cursor-pointer p-2"
            onClick={() => setSelectedImage(null)}
          >
            <X className="size-5" />
          </div>
          <div className="mx-auto">
            <Image
              src={selectedImage.secureUrl}
              width={150}
              height={150}
              alt={selectedImage.name}
              className="object-contain"
            />
          </div>

          <div>
            <div className="flex gap-1 text-sm">
              <span className="font-semibold">Name:</span>
              <span>{selectedImage.name}</span>
            </div>

            <div className="flex gap-1 text-sm">
              <span className="font-semibold">Size:</span>
              <span>
                {selectedImage.height} x {selectedImage.width}
              </span>
            </div>

            <div className="flex gap-1 text-sm">
              <span className="font-semibold">Format:</span>
              <span>{selectedImage.format}</span>
            </div>

            <div className="flex gap-1 text-sm">
              <span className="font-semibold">URL:</span>
              <span>
                <Link className="text-sky-500" href={selectedImage.secureUrl}>
                  Click to view
                </Link>
              </span>
            </div>

            <div className="flex gap-1 text-sm">
              <span className="font-semibold">Thumbnail:</span>
              <span>
                <Link
                  className="text-sky-500"
                  href={selectedImage.thumbnailUrl}
                >
                  Click to view
                </Link>
              </span>
            </div>
          </div>

          <ImageEditForm selectedImage={selectedImage} />
        </AFloatingBox>
      )}
    </div>
  );
};

export default MediaData;
