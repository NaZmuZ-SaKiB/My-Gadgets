"use client";

import MGButton from "@/components/global/shared/MGButton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMediaGetAllQuery } from "@/lib/queries/media.query";
import { cn } from "@/lib/utils";
import { TMedia } from "@/types/media.type";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";

type TProps = {
  selectedImages: TMedia[];
  setSelectedImages: (images: TMedia[]) => void;
  multiple?: boolean;
  title?: string;
};

const MediaModal = ({
  selectedImages,
  setSelectedImages,
  multiple = false,
  title = "Select Image",
}: TProps) => {
  const params = new URLSearchParams();
  params.append("limit", "30");

  const { data, isLoading } = useMediaGetAllQuery(params.toString());

  const handleClick = (image: TMedia) => {
    if (multiple) {
      if (!!selectedImages.find((img) => img._id === image._id)) {
        setSelectedImages(
          selectedImages.filter((img) => img._id !== image._id)
        );
      } else {
        setSelectedImages([...selectedImages, image]);
      }
    } else {
      setSelectedImages([image]);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MGButton
          className="rounded-none self-start px-5 py-2 h-auto"
          variant="outline"
        >
          {title}
        </MGButton>
      </DialogTrigger>

      <DialogContent className="max-w-[95vw] h-[95svh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-semibold">
            Insert File{multiple ? "s" : ""}
          </DialogTitle>
        </DialogHeader>

        <div className="h-full">
          {isLoading && (
            <div className="grid place-items-center h-[400px]">
              <Loader2 className="animate-spin mx-auto size-[50px] text-primary" />
            </div>
          )}

          <div className="flex max-sm:justify-center gap-3 flex-wrap">
            {data?.data?.map((image: TMedia) => {
              const isActive = !!selectedImages.find(
                (img) => img._id === image._id
              );
              return (
                <div
                  key={image._id}
                  className={cn("relative border-2 border-transparent", {
                    "border-primary": isActive,
                  })}
                  onClick={() => handleClick(image)}
                >
                  <div className="aspect-square border border-slate-300 bg-slate-100 overflow-hidden cursor-pointer size-32">
                    <Image
                      src={image.secureUrl}
                      width={128}
                      height={128}
                      alt={image.name}
                      className="size-full object-contain"
                    />
                  </div>
                  <div
                    className={cn(
                      "absolute -top-2 -right-3 bg-white p-[1px] border border-primary",
                      {
                        hidden: !isActive,
                      }
                    )}
                  >
                    <div className="p-1 bg-primary text-white">
                      <Check strokeWidth="4px" className="size-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <MGButton className="rounded-none self-start px-3 py-2 h-auto">
              Use Image{multiple ? "s" : ""}
            </MGButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MediaModal;
