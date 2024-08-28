"use client";

import { AQTags } from "@/constants/tags";
import { useMediaCreateMutation } from "@/lib/queries/media.query";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "sonner";

type TProps = {
  children?: React.ReactNode;
};

const UploadImageButton = ({ children }: TProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createImageFn } = useMediaCreateMutation();

  const handleSuccess = async (result: any) => {
    const { info } = result;

    try {
      await createImageFn({
        name: info.display_name,
        publicId: info.public_id,
        height: info.height,
        width: info.width,
        format: info.format,
        url: info.url,
        secureUrl: info.secure_url,
        thumbnailUrl: info.thumbnail_url,
      });
    } catch (error: any) {
      toast.error(error?.message || "A client error occurred.");
    }
  };

  const onClose = () => {
    queryClient.invalidateQueries({
      queryKey: [AQTags.MEDIA, AQTags.ALL],
      exact: false,
    });
  };

  return (
    <CldUploadWidget
      options={{
        folder: process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME,
        sources: ["local", "url", "google_drive", "image_search"],
        maxFileSize: 1024 * 1024,
        multiple: true,
        showCompletedButton: true,
      }}
      signatureEndpoint={"/api/sign-image"}
      onSuccess={handleSuccess}
      onClose={onClose}
    >
      {({ open }) => (
        <div onClick={() => open()}>
          {children ? (
            children
          ) : (
            <div className="size-[128px] border border-gray-300 text-gray-300 rounded-lg hover:border-primary hover:text-primary cursor-pointer">
              <Plus className="size-full" />
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default UploadImageButton;
