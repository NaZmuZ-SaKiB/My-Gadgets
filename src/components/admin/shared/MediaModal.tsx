"use client";

import Image from "next/image";
import { Check, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

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
import DataLimitSelect from "./filters/DataLimitSelect";
import MGPagination from "@/components/global/shared/MGPagination";

import { cn } from "@/lib/utils";
import { TMedia } from "@/types/media.type";
import { useMediaGetAllQuery } from "@/lib/queries/media.query";

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
  const searchParams = useSearchParams();

  const { data, isLoading } = useMediaGetAllQuery(
    `${searchParams.toString()}&limit=35&page=1`,
  );

  const handleClick = (image: TMedia) => {
    if (multiple) {
      if (!!selectedImages.find((img) => img._id === image._id)) {
        setSelectedImages(
          selectedImages.filter((img) => img._id !== image._id),
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
      <DialogTrigger asChild className="no-focus">
        <MGButton
          className="h-auto self-start rounded-none px-5 py-2"
          variant="outline"
        >
          {title}
        </MGButton>
      </DialogTrigger>

      <DialogContent className="no-focus flex max-h-[95svh] max-w-[95vw] flex-col overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-semibold">
            Insert File{multiple ? "s" : ""}
          </DialogTitle>
        </DialogHeader>

        <div className="h-full">
          {isLoading && (
            <div className="grid h-[400px] place-items-center">
              <Loader2 className="mx-auto size-[50px] animate-spin text-primary" />
            </div>
          )}

          <div className="flex flex-wrap gap-3 max-sm:justify-center">
            {data?.data?.map((image: TMedia) => {
              const isActive = !!selectedImages.find(
                (img) => img._id === image._id,
              );
              return (
                <div
                  key={image._id}
                  className={cn("relative border-2 border-transparent", {
                    "border-primary": isActive,
                  })}
                  onClick={() => handleClick(image)}
                >
                  <div className="aspect-square size-32 cursor-pointer overflow-hidden border border-slate-300 bg-slate-100">
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
                      "absolute -right-3 -top-2 border border-primary bg-white p-[1px]",
                      {
                        hidden: !isActive,
                      },
                    )}
                  >
                    <div className="bg-primary p-1 text-white">
                      <Check strokeWidth="4px" className="size-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <DialogFooter className="flex w-full !items-center !justify-between max-lg:!flex-col-reverse">
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
          <DialogClose asChild>
            <MGButton className="h-auto rounded-none px-3 py-2 lg:self-end">
              Use Image{multiple ? "s" : ""}
            </MGButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MediaModal;
