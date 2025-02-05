"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { AQTags } from "@/constants";
import { useCategoryDeleteMutation } from "@/lib/queries/category.query";

type TProps = {
  categories: string[];
  setCategories?: (categories: string[]) => void;
  children?: React.ReactNode;
};

const CategoryDeleteDialog = ({
  categories,
  setCategories,
  children,
}: TProps) => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const queryClient = useQueryClient();

  const { mutateAsync: deleteCategories, isPending } =
    useCategoryDeleteMutation();

  const handleDelete = async () => {
    try {
      const result = await deleteCategories(categories);

      if (result?.success) {
        queryClient.invalidateQueries({
          queryKey: [AQTags.CATEGORY, AQTags.ALL],
          exact: false,
        });

        if (setCategories) {
          setCategories([]);
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
            Are you sure you want to delete the selected Categories?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This will delete all the selected categories with its
            sub-categories. You can not reverse this. Do you understand that?
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

export default CategoryDeleteDialog;
