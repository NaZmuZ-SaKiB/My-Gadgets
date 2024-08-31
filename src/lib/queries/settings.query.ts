import { AQTags } from "@/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  settingsGetAction,
  settingsUpdateAction,
} from "../actions/settings.action";

export const useSettingsGetQuery = () =>
  useQuery({
    queryKey: [AQTags.SETTINGS],
    queryFn: () => settingsGetAction(),
  });

export const useSettingsUpdateMutation = () =>
  useMutation({
    mutationFn: settingsUpdateAction,
  });
