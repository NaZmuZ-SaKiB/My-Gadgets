"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import AGrid from "@/components/admin/admin-ui/AGrid";
import APageContainer from "@/components/admin/admin-ui/APageContainer";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import MGAInput from "@/components/admin/forms/MGAInput";
import MGForm from "@/components/global/forms/MGForm";
import MGButton from "@/components/global/shared/MGButton";
import { AQTags } from "@/constants";
import {
  useSettingsGetQuery,
  useSettingsUpdateMutation,
} from "@/lib/queries/settings.query";
import { SettingsValidation } from "@/lib/validations/settings.validation";
import { TSocialSettings } from "@/types/settings.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const SocialSettingsPage = () => {
  const { data, isLoading } = useSettingsGetQuery();
  const socialSettings: TSocialSettings = data?.data?.social;

  const queryClient = useQueryClient();

  const { mutateAsync: updateSettingsFn, isPending } =
    useSettingsUpdateMutation();

  const handleSubmit: SubmitHandler<
    z.infer<typeof SettingsValidation.update>
  > = async (values) => {
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
    social: {
      facebook: socialSettings?.facebook || "",
      twitter: socialSettings?.twitter || "",
      instagram: socialSettings?.instagram || "",
      linkedin: socialSettings?.linkedin || "",
      youtube: socialSettings?.youtube || "",
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
        <APageHeading title="Social Settings">
          <MGButton
            type="submit"
            className="h-auto self-start rounded-none px-5 py-2"
            disabled={isPending}
          >
            Save Changes
          </MGButton>
        </APageHeading>

        <AGrid reverse>
          <div>
            <AFloatingBox className="mb-4 flex flex-col gap-4">
              <MGAInput name="social.facebook" label="Facebook" />
              <MGAInput name="social.twitter" label="Twitter" />
              <MGAInput name="social.instagram" label="Instagram" />
              <MGAInput name="social.linkedin" label="Linked in" />
              <MGAInput name="social.youtube" label="YouTube" />
            </AFloatingBox>
          </div>
        </AGrid>
      </MGForm>
    </APageContainer>
  );
};

export default SocialSettingsPage;
