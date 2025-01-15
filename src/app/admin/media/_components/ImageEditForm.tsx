"use client";

import { TMedia } from "@/types/media.type";

type TProps = {
  selectedImage: TMedia | null;
};

const ImageEditForm = ({ selectedImage }: TProps) => {
  return (
    <div>
      <h1>ImageEditForm</h1>
    </div>
  );
};

export default ImageEditForm;
