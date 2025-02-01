"use client";

import Image from "next/image";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import MediaModal from "../shared/MediaModal";
import MGButton from "@/components/global/shared/MGButton";
import UploadImageButton from "@/app/admin/media/_components/UploadImageButton";

import { TMedia } from "@/types/media.type";

type TProps = {
  name: string;
  label: string;
  defaultValue?: TMedia[];
  multiple?: boolean;
  description?: string;
  reset?: boolean;
};

const MGAImageInput = ({
  name,
  label,
  defaultValue = [],
  multiple = false,
  description,
  reset = true,
}: TProps) => {
  const { control, setValue, formState } = useFormContext();

  const [images, setImages] = useState<TMedia[]>(defaultValue);
  const [imageIds, setImageIds] = useState<string[]>(
    multiple ? defaultValue.map((img) => img?._id) : [],
  );
  const [singleImageId, setSingleImageId] = useState<string | null>(
    multiple ? null : defaultValue[0]?._id,
  );

  useEffect(() => {
    const ids = images.map((image) => image._id);

    if (multiple) {
      setImageIds(ids);
    } else {
      setSingleImageId(ids[0]);
    }
  }, [images, multiple]);

  useEffect(() => {
    if (multiple) {
      setValue(name, imageIds);
    } else {
      setValue(name, singleImageId);
    }
  }, [imageIds, singleImageId, setValue, name, multiple]);

  useEffect(() => {
    if (formState.isSubmitted && reset) {
      setImages(defaultValue);
    }
  }, [formState, defaultValue, reset]);

  const handleRemoveImage = (id: string) => {
    if (multiple) {
      const updatedImages = images.filter((img) => img._id !== id);
      setImages(updatedImages);
    } else {
      setImages([]);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className="flex w-full flex-col gap-1">
          <FormLabel className="font-medium">{label}</FormLabel>
          <FormControl>
            <div className="flex flex-col items-start gap-4">
              {images.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {images.map((img: TMedia) => (
                    <div
                      key={img._id}
                      className="relative flex aspect-square items-center justify-center border"
                    >
                      <Image
                        src={img.secureUrl}
                        alt={img.name}
                        width={80}
                        height={80}
                        className="object-contain"
                      />

                      <div
                        className="absolute -right-1.5 -top-1.5 cursor-pointer border bg-white"
                        onClick={() => handleRemoveImage(img._id)}
                      >
                        <X className="size-4" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <MediaModal
                  selectedImages={images}
                  setSelectedImages={setImages}
                  title={`Select ${label}`}
                  multiple={multiple}
                />
                <UploadImageButton>
                  <MGButton
                    type="button"
                    variant="outline"
                    className="aspect-square h-full self-start rounded-none px-1 py-1 text-primary"
                  >
                    <Plus className="size-6" />
                  </MGButton>
                </UploadImageButton>
              </div>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="!mt-0 font-normal" />
        </FormItem>
      )}
    />
  );
};

export default MGAImageInput;
