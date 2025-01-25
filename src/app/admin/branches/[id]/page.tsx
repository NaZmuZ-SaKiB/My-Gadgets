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
  useBranchGetByIdQuery,
  useBranchUpdateMutation,
} from "@/lib/queries/branch.query";
import { BranchValidation } from "@/lib/validations/branch.validation";
import { TBranch } from "@/types/branch.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const SingleBranchPage = () => {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const { data: branchData, isLoading: branchLoading } = useBranchGetByIdQuery(
    id as string,
  );
  const branch: TBranch = branchData?.data;

  // Handle brand update
  const { mutateAsync: updateBranchFn, isPending } = useBranchUpdateMutation();

  const handleBranchUpdate: SubmitHandler<
    Partial<z.infer<typeof BranchValidation.create>>
  > = async (values) => {
    try {
      const result = await updateBranchFn({
        id: `${id}`,
        payload: values,
      });

      if (result?.success) {
        toast.success(result?.message);
        queryClient.invalidateQueries({
          queryKey: [AQTags.BRANCH],
          exact: false,
        });
      } else {
        toast.error(result?.message || "A server error occurred.");
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occurred.");
    }
  };

  // Loading

  if (branchLoading) {
    return (
      <div className="grid h-full place-items-center">
        <Loader2 className="mx-auto size-[100px] animate-spin text-primary" />
      </div>
    );
  }

  const defaultValues = {
    name: branch?.name || "",
    address: branch?.address || "",
    phone: branch?.phone || "",
    mapLink: branch?.mapLink || "",
  };

  return (
    <APageContainer>
      <APageHeading title={`Branch - ${branch?.name}`} backButton />

      <AGrid>
        <AFloatingBox>
          <MGForm
            onSubmit={handleBranchUpdate}
            resolver={zodResolver(BranchValidation.create.partial())}
            defaultValues={defaultValues}
            reset={false}
          >
            <h2 className="mb-1 text-lg font-medium text-slate-700">
              Update Branch
            </h2>

            <MGAInput name="name" label="Branch Name*" />
            <MGAInput name="phone" label="Phone Number*" />
            <MGAInput name="address" label="Branch Address*" />
            <MGAInput name="mapLink" label="Google Map Link" />

            <MGButton
              className="h-auto self-start rounded-none px-5 py-2"
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Update Branch"}
            </MGButton>
          </MGForm>
        </AFloatingBox>
      </AGrid>
    </APageContainer>
  );
};

export default SingleBranchPage;
