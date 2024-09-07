import { images } from "@/constants";
import { Star } from "lucide-react";
import Image from "next/image";

type TProps = {
  readonly?: boolean;
  maxStars?: number;
  value: number;
  setValue?: (rating: number) => void;
};

const StarRatingComponent = ({
  readonly = false,
  maxStars = 5,
  value,
  setValue = () => {},
}: TProps) => {
  if (!readonly) {
    return (
      <div className="flex gap-1 items-end">
        {Array(maxStars)
          .fill(0)
          .map((_, i) => (
            <span
              key={`rating-star-${i}`}
              onClick={() => setValue(i + 1)}
              className="cursor-pointer"
            >
              <Star
                fill={i + 1 <= value ? "orange" : "lightgray"}
                color={i + 1 <= value ? "orange" : "lightgray"}
              />
            </span>
          ))}
        <span className="text-lg pl-1">({value})</span>
      </div>
    );
  } else {
    const percentage = (value / maxStars) * 100;

    return (
      <div
        className="inline-block"
        style={{
          backgroundImage: `linear-gradient(90deg, #FDAF07  ${percentage}%, #D8D9DB  ${percentage}%)`,
          display: "flex",
        }}
      >
        <Image
          src={images.fullStar}
          className="inline-block w-full"
          alt="rating stars"
        />
      </div>
    );
  }
};

export default StarRatingComponent;
