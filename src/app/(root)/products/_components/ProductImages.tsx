import Image from "next/image";

import ImageGalleryModal from "./ImageGalleryModal";

import { TMedia } from "@/types/media.type";

type TProps = {
  images: TMedia[];
  alt: string;
  name: string;
};

const ProductImages = ({ alt, images, name }: TProps) => {
  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <Image
          src={images[0].secureUrl}
          alt={alt}
          className="w-full object-contain"
          width={500}
          height={500}
        />
      </div>

      <ImageGalleryModal images={images} name={name} alt={alt} />
    </div>
  );
};

export default ProductImages;
