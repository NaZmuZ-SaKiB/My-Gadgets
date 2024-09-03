"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TMedia } from "@/types/media.type";

import { Plus, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import MediaModal from "../shared/MediaModal";
import UploadImageButton from "@/app/admin/media/_components/UploadImageButton";
import MGButton from "@/components/global/shared/MGButton";

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
  console.log(defaultValue);
  const { control, setValue, formState } = useFormContext();

  const [images, setImages] = useState<TMedia[]>(defaultValue);
  const [imageIds, setImageIds] = useState<string[]>(
    multiple ? defaultValue.map((img) => img?._id) : []
  );
  const [singleImageId, setSingleImageId] = useState<string | null>(
    multiple ? null : defaultValue[0]?._id
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
        <FormItem className="flex flex-col gap-1 w-full">
          <FormLabel className="font-medium">{label}</FormLabel>
          <FormControl>
            <div className="flex flex-col gap-4 items-start">
              {images.length > 0 && (
                <div className="flex gap-3 flex-wrap">
                  {images.map((img: TMedia) => (
                    <div
                      key={img._id}
                      className="aspect-square border flex justify-center items-center relative"
                    >
                      <Image
                        src={img.secureUrl}
                        alt={img.name}
                        width={80}
                        height={80}
                        className="object-contain"
                      />

                      <div
                        className="absolute bg-white -top-1.5 -right-1.5 border cursor-pointer"
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
                    className="rounded-none self-start px-1 text-primary py-1 h-full aspect-square"
                  >
                    <Plus className="size-6" />
                  </MGButton>
                </UploadImageButton>
              </div>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="font-normal !mt-0" />
        </FormItem>
      )}
    />
  );
};

export default MGAImageInput;
