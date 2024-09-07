import { useMutation, useQuery } from "@tanstack/react-query";
import {
  reviewCreateAction,
  reviewGetAllAction,
  reviewGetByIdAction,
  reviewRemoveAction,
  reviewUpdateAction,
} from "../actions/review.action";
import { AQTags } from "@/constants";

export const useReviewCreateMutation = () =>
  useMutation({
    mutationFn: reviewCreateAction,
  });

export const useReviewUpdateMutation = () =>
  useMutation({
    mutationFn: reviewUpdateAction,
  });

export const useReviewGetAllQuery = (params: string) =>
  useQuery({
    queryKey: [AQTags.REVIEW, AQTags.ALL, params],
    queryFn: () => reviewGetAllAction(params),
  });

export const useReviewGetByIdQuery = (id: string) =>
  useQuery({
    queryKey: [AQTags.REVIEW, id],
    queryFn: () => reviewGetByIdAction(id),
  });

export const useReviewDeleteMutation = () =>
  useMutation({
    mutationFn: reviewRemoveAction,
  });
