"use client";

import AGrid from "@/components/admin/admin-ui/AGrid";
import APageContainer from "@/components/admin/admin-ui/APageContainer";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import MGForm from "@/components/global/forms/MGForm";
import MGButton from "@/components/global/shared/MGButton";
import { useProductCreateMutation } from "@/lib/queries/product.query";
import { ProductValidation } from "@/lib/validations/product.validation";
import generateSlug from "@/utils/generateSlug";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import ProductBasicInfoForm from "../_components/ProductBasicInfoForm";
import ProductSpecsForm from "../_components/ProductSpecsForm";
import ProductFiltersForm from "../_components/ProductFiltersForm";
import SelectCategories from "../_components/SelectCategories";
import ProductImagesForm from "../_components/ProductImagesForm";
import { toast } from "sonner";
import { AQTags } from "@/constants/tags";

const defaultValues = {
  name: "",
  slug: "",
  model: "",
  quantity: 1,
  salePrice: 1,
  regularPrice: 1,
  shippingCost: 0,
  badgeText: "",
  images: [],
  shortDescription: "",
  description: "",
  specifications: "",
  brand: "",
  categories: [],
  operatingSystem: "",
  connectivity: [],
  chargingPort: "",
  weight: 0,
  powerSource: [],
  camera: 0,
  displaySize: 0,
  compatibility: [],
};

const AddProductPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { mutateAsync: createProductFn, isPending } =
    useProductCreateMutation();

  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSubmit: SubmitHandler<
    z.infer<typeof ProductValidation.create>
  > = async (values) => {
    values.categories = selectedCategories;

    if (values.weight === 0) delete values.weight;
    if (values.camera === 0) delete values.camera;
    if (values.displaySize === 0) delete values.displaySize;

    // Generate slug
    values.slug = generateSlug(values.name);

    try {
      const result = await createProductFn(values);

      if (result?.success) {
        toast.success(result?.message);
        queryClient.invalidateQueries({
          queryKey: [AQTags.PRODUCT, AQTags.ALL],
          exact: false,
        });
        router.push("/admin/products");
      } else {
        toast.error(result?.message || "A server error occurred.");
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occurred.");
    }
  };

  return (
    <APageContainer>
      <MGForm
        onSubmit={handleSubmit}
        resolver={zodResolver(ProductValidation.create)}
        defaultValues={defaultValues}
        className="gap-4"
        reset={false}
      >
        <APageHeading title="Add Product">
          <MGButton
            type="submit"
            className="rounded-none self-start px-5 py-2 h-auto"
            disabled={isPending}
          >
            Save Changes
          </MGButton>
        </APageHeading>

        <AGrid reverse small>
          {/* Left Side */}
          <div className="space-y-4">
            <ProductBasicInfoForm />

            <ProductSpecsForm />

            <ProductFiltersForm />
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            <SelectCategories
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />

            <ProductImagesForm />
          </div>
        </AGrid>
      </MGForm>
    </APageContainer>
  );
};

export default AddProductPage;
