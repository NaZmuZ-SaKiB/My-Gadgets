"use client";

import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import AGrid from "@/components/admin/admin-ui/AGrid";
import CategorySelect from "./_components/CategorySelect";
import MGButton from "@/components/global/shared/MGButton";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import APageContainer from "@/components/admin/admin-ui/APageContainer";

import {
  useSettingsGetQuery,
  useSettingsUpdateMutation,
} from "@/lib/queries/settings.query";
import { TCategorySettings } from "@/types/settings.type";
import { AQTags } from "@/constants";

const CategorySettingsPage = () => {
  const [topMenuCats, setTopMenuCats] = useState<string[]>([]);

  const { data: settingsData, isLoading: settingsLoading } =
    useSettingsGetQuery();
  const categorySettings: TCategorySettings = settingsData?.data?.category;

  useEffect(() => {
    setTopMenuCats(
      categorySettings?.showOnTopMenu?.map((item) => item._id) || [],
    );
  }, [categorySettings]);

  const queryClient = useQueryClient();

  const { mutateAsync: updateSettingsFn, isPending } =
    useSettingsUpdateMutation();

  const handleSubmit = async () => {
    const values = {
      category: {
        showOnTopMenu: topMenuCats,
      },
    };

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

  if (settingsLoading) {
    return (
      <div className="grid h-full place-items-center">
        <Loader2 className="mx-auto size-[100px] animate-spin text-primary" />
      </div>
    );
  }
  return (
    <APageContainer>
      <APageHeading title="Category Settings">
        <MGButton
          className="h-auto self-start rounded-none px-5 py-2"
          disabled={isPending}
          onClick={handleSubmit}
        >
          Save Changes
        </MGButton>
      </APageHeading>

      <AGrid>
        <AFloatingBox>
          <h2 className="font-medium text-slate-700">Top Menu Categories*</h2>
          <p className="mb-5 text-sm text-slate-500">
            This Categories will be available at the top menu. Maximum 8
            categories can be selected.
          </p>

          <CategorySelect
            selectedCategories={topMenuCats}
            setSelectedCategories={setTopMenuCats}
            maxCategories={8}
          />
        </AFloatingBox>
      </AGrid>
    </APageContainer>
  );
};

export default CategorySettingsPage;
