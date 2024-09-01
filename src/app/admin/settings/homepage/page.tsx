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
import { useSettingsGetQuery } from "@/lib/queries/settings.query";
import { SettingsValidation } from "@/lib/validations/settings.validation";
import { THomepageSettings } from "@/types/settings.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import ProductSelect from "./_components/ProductSelect";

const HomepageSettingsPage = () => {
  const { data, isLoading } = useSettingsGetQuery();
  const homeSettings: THomepageSettings = data?.data?.homepage;

  const handleSubmit: SubmitHandler<
    z.infer<typeof SettingsValidation.update>
  > = (values) => {
    console.log(values);
  };

  if (isLoading) {
    return (
      <div className="h-full grid place-items-center">
        <Loader2 className="animate-spin mx-auto size-[100px] text-primary" />
      </div>
    );
  }

  return (
    <APageContainer>
      <APageHeading title="Homepage Settings" />

      <MGForm
        onSubmit={handleSubmit}
        resolver={zodResolver(SettingsValidation.update)}
        reset={false}
      >
        <AGrid>
          <div className="flex flex-col gap-4">
            <AFloatingBox className="flex flex-col gap-3">
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
                  homeSettings?.featuredCategories?.map((item) => item._id) ||
                  []
                }
                fetchFunction={useCategoryGetAllQuery}
                multiple
              />
              <MGASearchSelectAsync
                name="homepage.featuredBrands"
                label="Featured Brands"
                optionLabelField="name"
                defaultValue={
                  homeSettings?.featuredBrands?.map((item) => item._id) || []
                }
                fetchFunction={useBrandGetAllQuery}
                multiple
              />
            </AFloatingBox>

            <AFloatingBox className="flex flex-col gap-3">
              <ProductSelect
                name="homepage.popularProducts"
                label="Popular Products"
                defaultValue={homeSettings.popularProducts || []}
                multiple
              />

              <ProductSelect
                name="homepage.topSellingProducts"
                label="Top Selling Products"
                defaultValue={homeSettings.popularProducts || []}
                multiple
              />
            </AFloatingBox>
          </div>

          <div>
            <AFloatingBox>
              <MGARichInput name="description" label="Description" />
            </AFloatingBox>
          </div>
        </AGrid>
      </MGForm>
    </APageContainer>
  );
};

export default HomepageSettingsPage;
