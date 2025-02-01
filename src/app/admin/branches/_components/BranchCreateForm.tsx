"use client";

import { z } from "zod";
import { toast } from "sonner";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import MGForm from "@/components/global/forms/MGForm";
import MGAInput from "@/components/admin/forms/MGAInput";
import MGButton from "@/components/global/shared/MGButton";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";

import { useBranchCreateMutation } from "@/lib/queries/branch.query";
import { BranchValidation } from "@/lib/validations/branch.validation";
import { AQTags } from "@/constants";

const defaultValues = {
  name: "",
  address: "",
  phone: "",
  mapLink: "",
};

const BranchCreateForm = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createBranchFn, isPending } = useBranchCreateMutation();

  const handleBranchCreate: SubmitHandler<
    z.infer<typeof BranchValidation.create>
  > = async (values) => {
    if (!values.mapLink) delete values.mapLink;

    try {
      const result = await createBranchFn(values);

      if (result?.success) {
        toast.success(result?.message);
        queryClient.invalidateQueries({
          queryKey: [AQTags.BRANCH, AQTags.ALL],
          exact: false,
        });
      } else {
        toast.error(result?.message || "A server error occurred.");
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occurred.");
    }
  };

  return (
    <AFloatingBox>
      <h2 className="mb-5 text-lg font-medium text-slate-700">Add Branch</h2>

      <MGForm
        onSubmit={handleBranchCreate}
        resolver={zodResolver(BranchValidation.create)}
        defaultValues={defaultValues}
      >
        <MGAInput name="name" label="Branch Name*" />
        <MGAInput name="phone" label="Phone Number*" />
        <MGAInput name="address" label="Branch Address*" />
        <MGAInput name="mapLink" label="Google Map Link" />

        <MGButton
          className="h-auto self-start rounded-none px-5 py-2"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create Branch"}
        </MGButton>
      </MGForm>
    </AFloatingBox>
  );
};

export default BranchCreateForm;
