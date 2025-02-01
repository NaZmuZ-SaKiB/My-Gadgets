"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import MGForm from "@/components/global/forms/MGForm";
import MGInput from "@/components/global/forms/MGInput";
import MGButton from "@/components/global/shared/MGButton";
import MGTextarea from "@/components/global/forms/MGTextarea";
import StarRatingComponent from "@/components/global/shared/StarRatingComponent";

import { ReviewValidation } from "@/lib/validations/review.validation";
import { useReviewCreateMutation } from "@/lib/queries/review.query";

type TProps = {
  product: string;
};

const ReviewCreateForm = ({ product }: TProps) => {
  const [rating, setRating] = useState(3);

  const { mutateAsync: createReviewFn, isPending } = useReviewCreateMutation();

  const handleSubmit: SubmitHandler<
    z.infer<typeof ReviewValidation.create>
  > = async (values) => {
    values.rating = rating;

    try {
      const result = await createReviewFn(values);

      if (result?.success) {
        toast.success(result?.message);
        setRating(3);
      } else {
        toast.error(result?.message || "A Server Error Occurred.");
      }
    } catch (error: any) {
      toast.error(error?.message || "A Client Error Occurred.");
    }
  };

  return (
    <MGForm
      onSubmit={handleSubmit}
      resolver={zodResolver(ReviewValidation.create)}
      defaultValues={{ product, comment: "" }}
    >
      <StarRatingComponent value={rating} setValue={setRating} />
      <MGTextarea name="comment" label="Review" />
      <div className="hidden">
        <MGInput name="product" label="Product" />
      </div>
      <MGButton disabled={isPending} className="self-start rounded-lg">
        Submit
      </MGButton>
    </MGForm>
  );
};

export default ReviewCreateForm;
