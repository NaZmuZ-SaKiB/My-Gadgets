"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { TMedia } from "@/types/media.type";

type TProps = {
  images: TMedia[];
  alt: string;
  name: string;
};

const ImageGalleryModal = ({ images, alt, name }: TProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleImageChange = (direction: "left" | "right") => {
    const currentIndex = images.findIndex(
      (image) => image._id === selectedImage._id,
    );

    if (direction === "left" && currentIndex === 0) {
      return setSelectedImage(images[images.length - 1]);
    }

    if (direction === "right" && currentIndex === images.length - 1) {
      return setSelectedImage(images[0]);
    }

    const nextIndex =
      direction === "left" ? currentIndex - 1 : currentIndex + 1;

    setSelectedImage(images[nextIndex]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {images.map((image, i) => (
            <div
              key={`product-gallary-image-${image._id}`}
              onClick={() => setSelectedImage(image)}
              className={`aspect-square cursor-pointer overflow-hidden rounded-lg border-2`}
            >
              <Image
                src={image.secureUrl}
                alt={alt}
                height={65}
                width={65}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </DialogTrigger>

      <DialogContent className="[&>button]:no-focus w-full max-w-full gap-0 overflow-hidden border-0 p-0 sm:max-w-[500px] [&>button]:bg-white">
        <DialogTitle className="hidden">Gallery</DialogTitle>
        <div className="relative">
          <div
            className={cn(
              "absolute left-1 top-[45%] flex size-9 cursor-pointer items-center justify-center rounded-full bg-black/80 text-white",
              {},
            )}
            onClick={() => handleImageChange("left")}
          >
            <ChevronLeft className="size-8" />
          </div>

          <div className="aspect-square size-full overflow-hidden sm:size-[500px]">
            <div className={"flex"}>
              {images.map((image) => (
                <Image
                  key={`modal-image-${image._id}`}
                  src={image.secureUrl}
                  alt={alt}
                  width={500}
                  height={500}
                  className={cn(
                    "aspect-square w-svw object-contain sm:size-[500px]",
                    {
                      hidden: image._id !== selectedImage._id,
                    },
                  )}
                />
              ))}
            </div>
          </div>
          <div className="bg-slate-900 px-3 py-2 text-sm text-white">
            {name}
          </div>

          <div
            className={cn(
              "absolute right-1 top-[45%] flex size-9 cursor-pointer items-center justify-center rounded-full bg-black/80 text-white",
              {},
            )}
            onClick={() => handleImageChange("right")}
          >
            <ChevronRight className="size-8" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageGalleryModal;
