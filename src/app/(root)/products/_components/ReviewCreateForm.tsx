"use client";

import MGForm from "@/components/global/forms/MGForm";
import MGInput from "@/components/global/forms/MGInput";
import MGTextarea from "@/components/global/forms/MGTextarea";
import MGButton from "@/components/global/shared/MGButton";
import StarRatingComponent from "@/components/global/shared/StarRatingComponent";
import { useReviewCreateMutation } from "@/lib/queries/review.query";
import { ReviewValidation } from "@/lib/validations/review.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
      <MGButton disabled={isPending} className="rounded-lg self-start">
        Submit
      </MGButton>
    </MGForm>
  );
};

export default ReviewCreateForm;
