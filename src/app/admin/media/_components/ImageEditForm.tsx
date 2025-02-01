"use client";

import { z } from "zod";
import { toast } from "sonner";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import MGForm from "@/components/global/forms/MGForm";
import MGAInput from "@/components/admin/forms/MGAInput";
import MGButton from "@/components/global/shared/MGButton";

import { useMediaUpdateMutation } from "@/lib/queries/media.query";
import { TMedia } from "@/types/media.type";
import { AQTags } from "@/constants";

type TProps = {
  selectedImage: TMedia | null;
};

const imageSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

const ImageEditForm = ({ selectedImage }: TProps) => {
  const { mutateAsync: updateImage, isPending } = useMediaUpdateMutation();

  const queryClient = useQueryClient();

  const handleSubmit: SubmitHandler<{ name: string }> = async (values) => {
    try {
      const result = await updateImage({
        id: `${selectedImage?._id}`,
        payload: values,
      });

      if (result?.success) {
        toast.success(result?.message);

        queryClient.invalidateQueries({
          queryKey: [AQTags.MEDIA, AQTags.ALL],
          exact: false,
        });
      } else {
        toast.error(result?.message || "A server error occurred.");
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occurred.");
    }
  };

  return (
    <MGForm onSubmit={handleSubmit} resolver={zodResolver(imageSchema)}>
      <MGAInput label="Update Name" name="name" />

      <MGButton
        className="h-auto self-start rounded-none px-5 py-2"
        disabled={isPending}
      >
        {isPending ? "Saving..." : "Save Changes"}
      </MGButton>
    </MGForm>
  );
};

export default ImageEditForm;
