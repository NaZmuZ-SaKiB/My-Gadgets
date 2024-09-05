import { TMedia } from "@/types/media.type";
import Image from "next/image";
import ImageGalleryModal from "./ImageGalleryModal";

type TProps = {
  images: TMedia[];
  alt: string;
  name: string;
};

const ProductImages = ({ alt, images, name }: TProps) => {
  return (
    <div>
      <div className="border border-slate-300 rounded-2xl overflow-hidden">
        <Image
          src={images[0].secureUrl}
          alt={alt}
          className="object-contain w-full"
          width={500}
          height={500}
        />
      </div>

      <ImageGalleryModal images={images} name={name} alt={alt} />
    </div>
  );
};

export default ProductImages;
