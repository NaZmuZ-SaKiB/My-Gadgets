"use client";

import Image from "next/image";
import { Star } from "lucide-react";

import { images } from "@/constants";

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
      <div className="flex items-center gap-1">
        {Array(maxStars)
          .fill(0)
          .map((_, i) => (
            <span
              key={`rating-star-${i}`}
              onClick={() => setValue(i + 1)}
              className="cursor-pointer"
            >
              <Star
                fill={i + 1 <= value ? "orange" : "#cbd5e1"}
                color={i + 1 <= value ? "orange" : "#cbd5e1"}
              />
            </span>
          ))}
        <span className="pl-1 text-lg">({value})</span>
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
