"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { TMedia } from "@/types/media.type";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type TProps = {
  images: TMedia[];
  alt: string;
  name: string;
};

const ImageGalleryModal = ({ images, alt, name }: TProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleImageChange = (direction: "left" | "right") => {
    const currentIndex = images.findIndex(
      (image) => image._id === selectedImage._id
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
        <div className="flex justify-center flex-wrap gap-2 mt-4">
          {images.map((image, i) => (
            <div
              key={`product-gallary-image-${image._id}`}
              onClick={() => setSelectedImage(image)}
              className={`border-2 rounded-lg overflow-hidden cursor-pointer aspect-square`}
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

      <DialogContent className="w-full max-w-full sm:max-w-[500px] overflow-hidden gap-0 p-0 border-0 [&>button]:bg-white">
        <div className="relative">
          <div
            className={cn(
              "bg-black/80 rounded-full size-9 text-white cursor-pointer absolute left-1 top-[45%] flex justify-center items-center",
              {}
            )}
            onClick={() => handleImageChange("left")}
          >
            <ChevronLeft className="size-8" />
          </div>

          <div className="size-full aspect-square sm:size-[500px] overflow-hidden">
            <div className={"flex"}>
              {images.map((image) => (
                <Image
                  key={`modal-image-${image._id}`}
                  src={image.secureUrl}
                  alt={alt}
                  width={500}
                  height={500}
                  className={cn(
                    "object-contain w-svw aspect-square sm:size-[500px]",
                    {
                      hidden: image._id !== selectedImage._id,
                    }
                  )}
                />
              ))}
            </div>
          </div>
          <div className="px-3 py-2 bg-slate-900 text-white text-sm">
            {name}
          </div>

          <div
            className={cn(
              "bg-black/80 rounded-full size-9 text-white cursor-pointer absolute right-1 top-[45%] flex justify-center items-center",
              {}
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
