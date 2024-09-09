"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import AGrid from "@/components/admin/admin-ui/AGrid";
import APageContainer from "@/components/admin/admin-ui/APageContainer";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import MGAInput from "@/components/admin/forms/MGAInput";
import MGARichInput from "@/components/admin/forms/MGARichInput";
import MGForm from "@/components/global/forms/MGForm";
import MGButton from "@/components/global/shared/MGButton";
import { AQTags } from "@/constants";
import {
  useSettingsGetQuery,
  useSettingsUpdateMutation,
} from "@/lib/queries/settings.query";
import { SettingsValidation } from "@/lib/validations/settings.validation";
import { TFooterSettings } from "@/types/settings.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FooterSettingsPage = () => {
  const { data, isLoading } = useSettingsGetQuery();
  const footerSettings: TFooterSettings = data?.data?.footer;

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
      <div className="h-full grid place-items-center">
        <Loader2 className="animate-spin mx-auto size-[100px] text-primary" />
      </div>
    );
  }

  const defaultValues = {
    footer: {
      slogan: footerSettings?.slogan || "",
      email: footerSettings?.email || "",
      hours: footerSettings?.hours || "",
      contact: footerSettings?.contact || "",
      copyright: footerSettings?.copyright || "",
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
        <APageHeading title="Footer Settings">
          <MGButton
            type="submit"
            className="rounded-none self-start px-5 py-2 h-auto"
            disabled={isPending}
          >
            Save Changes
          </MGButton>
        </APageHeading>

        <AGrid reverse>
          <div>
            <AFloatingBox className="flex flex-col gap-4 mb-4">
              <MGAInput name="footer.slogan" label="Slogan" />
              <MGAInput name="footer.email" label="Email" />
              <MGAInput name="footer.hours" label="Hours" />
              <MGARichInput name="footer.contact" label="Contact" />
              <MGAInput name="footer.copyright" label="Copyright" />
            </AFloatingBox>
          </div>
        </AGrid>
      </MGForm>
    </APageContainer>
  );
};

export default FooterSettingsPage;
