"use client";

import AGrid from "@/components/admin/admin-ui/AGrid";
import APageContainer from "@/components/admin/admin-ui/APageContainer";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import MGForm from "@/components/global/forms/MGForm";
import MGButton from "@/components/global/shared/MGButton";
import { AQTags } from "@/constants/tags";
import {
  useProductGetByIdQuery,
  useProductUpdateMutation,
} from "@/lib/queries/product.query";
import { ProductValidation } from "@/lib/validations/product.validation";
import { TProduct } from "@/types/product.type";
import generateSlug from "@/utils/generateSlug";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ProductBasicInfoForm from "../_components/ProductBasicInfoForm";
import ProductSpecsForm from "../_components/ProductSpecsForm";
import ProductFiltersForm from "../_components/ProductFiltersForm";
import SelectCategories from "../_components/SelectCategories";
import ProductImagesForm from "../_components/ProductImagesForm";

const SingleProductPage = () => {
  const { id } = useParams();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { data, isLoading: productLoading } = useProductGetByIdQuery(
    id as string
  );
  const product: TProduct = data?.data;

  useEffect(() => {
    if (product) {
      setSelectedCategories(product.categories.map((cat) => cat._id));
    }
  }, [product]);

  const { mutateAsync: updateProductFn, isPending } =
    useProductUpdateMutation();

  const queryClient = useQueryClient();

  const handleSubmit: SubmitHandler<
    Partial<z.infer<typeof ProductValidation.create>>
  > = async (values) => {
    console.log(values);
    values.categories = selectedCategories;

    if (values.weight === 0) delete values.weight;
    if (values.camera === 0) delete values.camera;
    if (values.displaySize === 0) delete values.displaySize;

    // Generate slug
    if (values.name) {
      values.slug = generateSlug(values.name);
    }

    try {
      const result = await updateProductFn({
        id: id as string,
        payload: values,
      });

      if (result?.success) {
        toast.success(result?.message);
        queryClient.invalidateQueries({
          queryKey: [AQTags.PRODUCT],
          exact: false,
        });
      } else {
        toast.error(result?.message || "A server error occurred.");
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occurred.");
    }
  };

  if (productLoading) {
    return (
      <div className="h-full grid place-items-center">
        <Loader2 className="animate-spin mx-auto size-[100px] text-primary" />
      </div>
    );
  }

  const defaultValues = {
    name: product.name || "",
    slug: product.slug || "",
    model: product.model || "",
    quantity: product.quantity || 1,
    salePrice: product.salePrice || 1,
    regularPrice: product.regularPrice || 1,
    shippingCost: product.shippingCost || 0,
    badgeText: product.badgeText || "",
    images: product.images || [],
    shortDescription: product.shortDescription || "",
    description: product.description || "",
    specifications: product.specifications || "",
    brand: product.brand._id || "",
    categories: product?.categories.map((cat) => cat._id) || [],
    operatingSystem: product.operatingSystem || "",
    connectivity:
      product.connectivity?.map((item) => ({
        label: item,
        value: item,
      })) || [],
    chargingPort: product.chargingPort || "",
    weight: product.weight || 0,
    powerSource:
      product.powerSource?.map((item) => ({
        label: item,
        value: item,
      })) || [],
    camera: product.camera || 0,
    displaySize: product.displaySize || 0,
    compatibility:
      product.compatibility?.map((item) => ({
        label: item,
        value: item,
      })) || [],
  };

  return (
    <APageContainer>
      <MGForm
        onSubmit={handleSubmit}
        resolver={zodResolver(ProductValidation.update)}
        defaultValues={defaultValues}
        className="gap-4"
        reset={false}
      >
        <APageHeading title="Product">
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

            <ProductImagesForm defaultValues={defaultValues} />
          </div>
        </AGrid>
      </MGForm>
    </APageContainer>
  );
};

export default SingleProductPage;
