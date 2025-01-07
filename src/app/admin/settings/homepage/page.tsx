"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import AGrid from "@/components/admin/admin-ui/AGrid";
import APageContainer from "@/components/admin/admin-ui/APageContainer";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import MGAImageInput from "@/components/admin/forms/MGAImageInput";
import MGARichInput from "@/components/admin/forms/MGARichInput";
import MGASearchSelectAsync from "@/components/admin/forms/MGASearchSelectAsync";
import MGForm from "@/components/global/forms/MGForm";
import { useBrandGetAllQuery } from "@/lib/queries/brand.query";
import { useCategoryGetAllQuery } from "@/lib/queries/category.query";
import {
  useSettingsGetQuery,
  useSettingsUpdateMutation,
} from "@/lib/queries/settings.query";
import { SettingsValidation } from "@/lib/validations/settings.validation";
import { THomepageSettings } from "@/types/settings.type";
import { Loader2 } from "lucide-react";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import ProductSelect from "./_components/ProductSelect";
import FeaturedProductsSelect from "./_components/FeaturedProductsSelect";
import MGButton from "@/components/global/shared/MGButton";
import FlashSaleInput from "./_components/FlashSaleInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { AQTags } from "@/constants";

const HomepageSettingsPage = () => {
  const { data, isLoading } = useSettingsGetQuery();
  const homeSettings: THomepageSettings = data?.data?.homepage;

  const queryClient = useQueryClient();

  const { mutateAsync: updateSettingsFn, isPending } =
    useSettingsUpdateMutation();

  const handleSubmit: SubmitHandler<
    z.infer<typeof SettingsValidation.update>
  > = async (values) => {
    if (values?.homepage?.featuredProducts?.length) {
      values.homepage.featuredProducts = values.homepage.featuredProducts.map(
        (item) => ({
          banner: item?.banner,
          products: item.products,
        }),
      );
    }

    if (values?.homepage?.flashSale?.length) {
      values.homepage.flashSale = values.homepage.flashSale.map((item) => ({
        endDate: item.endDate,
        product: item.product,
      }));
    }

    try {
      const result = await updateSettingsFn(values);

      if (result?.success) {
        toast.success(result?.message);
        queryClient.invalidateQueries({
          queryKey: [AQTags.SETTINGS],
        });
      } else {
        toast.error(result?.message || "A server error occurred.");
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occurred.");
    }
  };

  if (isLoading) {
    return (
      <div className="grid h-full place-items-center">
        <Loader2 className="mx-auto size-[100px] animate-spin text-primary" />
      </div>
    );
  }

  const defaultValues = {
    homepage: {
      description: homeSettings?.description || "",
      featuredProducts: homeSettings?.featuredProducts?.map((item) => ({
        banner: item?.banner?._id,
        products: item.products.map((product: any) => product?._id),
      })),
      flashSale: homeSettings?.flashSale?.map((item) => ({
        endDate: item.endDate,
        product: item.product?._id,
      })),
    },
  };

  return (
    <APageContainer>
      <MGForm
        onSubmit={handleSubmit}
        reset={false}
        resolver={zodResolver(SettingsValidation.update)}
        defaultValues={defaultValues}
      >
        <APageHeading title="Homepage Settings">
          <MGButton
            type="submit"
            className="h-auto self-start rounded-none px-5 py-2"
            disabled={isPending}
          >
            Save Changes
          </MGButton>
        </APageHeading>

        <AGrid reverse>
          <div className="mb-4 flex flex-col gap-4">
            <AFloatingBox>
              <MGARichInput name="homepage.description" label="Description" />
            </AFloatingBox>

            <AFloatingBox>
              <FeaturedProductsSelect
                defaultValue={homeSettings.featuredProducts}
              />
            </AFloatingBox>

            <AFloatingBox>
              <FlashSaleInput defaultValue={homeSettings.flashSale} />
            </AFloatingBox>
          </div>

          <div className="flex flex-col gap-4">
            <AFloatingBox className="flex flex-col gap-5">
              <MGAImageInput
                name="homepage.sliderImages"
                label="Slider Images"
                defaultValue={homeSettings.sliderImages || []}
                multiple
                reset={false}
              />
              <MGAImageInput
                name="homepage.bannerImage1"
                label="Banner Image 1"
                defaultValue={
                  homeSettings.bannerImage1 ? [homeSettings.bannerImage1] : []
                }
                reset={false}
              />
              <MGAImageInput
                name="homepage.bannerImage2"
                label="Banner Image 2"
                defaultValue={
                  homeSettings.bannerImage2 ? [homeSettings.bannerImage2] : []
                }
                reset={false}
              />
              <MGAImageInput
                name="homepage.bannerImage3"
                label="Banner Image 3"
                defaultValue={
                  homeSettings.bannerImage3 ? [homeSettings.bannerImage3] : []
                }
                reset={false}
              />
              <MGASearchSelectAsync
                name="homepage.featuredCategories"
                label="Featured Categories"
                optionLabelField="name"
                defaultValue={
                  homeSettings?.featuredCategories?.map((item) => ({
                    value: item._id,
                    title: item.name,
                  })) || []
                }
                fetchFunction={useCategoryGetAllQuery}
                multiple
              />
              <MGASearchSelectAsync
                name="homepage.featuredBrands"
                label="Featured Brands"
                optionLabelField="name"
                defaultValue={
                  homeSettings?.featuredBrands?.map((item) => ({
                    value: item._id,
                    title: item.name,
                  })) || []
                }
                fetchFunction={useBrandGetAllQuery}
                multiple
              />
            </AFloatingBox>

            <AFloatingBox className="flex flex-col gap-5">
              <ProductSelect
                name="homepage.popularProducts"
                label="Popular Products"
                defaultValue={homeSettings.popularProducts || []}
                multiple
              />

              <ProductSelect
                name="homepage.topSellingProducts"
                label="Top Selling Products"
                defaultValue={homeSettings.topSellingProducts || []}
                multiple
              />

              <ProductSelect
                name="homepage.trendingProducts"
                label="Trending Products"
                defaultValue={homeSettings.trendingProducts || []}
                multiple
              />
            </AFloatingBox>
          </div>
        </AGrid>
      </MGForm>
    </APageContainer>
  );
};

export default HomepageSettingsPage;
