import { useMutation, useQuery } from "@tanstack/react-query";
import {
  mediaCreateAction,
  mediaGetAllAction,
  mediaGetByIdAction,
  mediaRemoveAction,
  mediaUpdateAction,
} from "../actions/media.action";
import { AQTags } from "@/constants";

export const useMediaCreateMutation = () =>
  useMutation({
    mutationFn: mediaCreateAction,
  });

export const useMediaUpdateMutation = () =>
  useMutation({
    mutationFn: mediaUpdateAction,
  });

export const useMediaGetAllQuery = (params: string) =>
  useQuery({
    queryKey: [AQTags.MEDIA, AQTags.ALL, params],
    queryFn: () => mediaGetAllAction(params),
  });

export const useMediaGetByIdQuery = (id: string) =>
  useQuery({
    queryKey: [AQTags.MEDIA, id],
    queryFn: () => mediaGetByIdAction(id),
  });

export const useMediaDeleteMutation = () =>
  useMutation({
    mutationFn: mediaRemoveAction,
  });
