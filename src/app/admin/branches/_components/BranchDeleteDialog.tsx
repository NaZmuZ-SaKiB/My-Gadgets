"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AQTags } from "@/constants";
import { useBranchDeleteMutation } from "@/lib/queries/branch.query";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

type TProps = {
  branches: string[];
  setBranches?: (branches: string[]) => void;
  children?: React.ReactNode;
};

const BranchDeleteDialog = ({ branches, setBranches, children }: TProps) => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const queryClient = useQueryClient();

  const { mutateAsync: deleteBranches, isPending } = useBranchDeleteMutation();

  const handleDelete = async () => {
    try {
      const result = await deleteBranches(branches);

      if (result?.success) {
        queryClient.invalidateQueries({
          queryKey: [AQTags.BRANCH, AQTags.ALL],
          exact: false,
        });

        if (setBranches) {
          setBranches([]);
        }

        toast.success(result?.message);
      } else {
        toast.error(result?.message || "A server error occurred.");
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occurred.");
    } finally {
      setOpen(false);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete the selected Branches?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This will delete all the selected branches. You can not reverse
            this. Do you understand that?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <label className="flex items-center gap-2">
          <Input
            type="checkbox"
            className="size-4"
            onChange={(e) => setDisabled(!e.target.checked)}
          />{" "}
          <span className="text-slate-700">Yes, I understand.</span>
        </label>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            disabled={disabled || isPending}
            variant="destructive"
            onClick={handleDelete}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BranchDeleteDialog;
