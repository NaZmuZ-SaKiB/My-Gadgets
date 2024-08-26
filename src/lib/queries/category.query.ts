import { useMutation } from "@tanstack/react-query";
import { categoryCreateAction } from "../actions/category.action";

export const useCategoryCreateMutation = () =>
  useMutation({
    mutationFn: categoryCreateAction,
  });
