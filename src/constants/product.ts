import {
  TChargingPort,
  TCompatibility,
  TConnectivity,
  TOperatingSystem,
  TPowerSource,
} from "@/types/product.type";
import { TReviewStatus } from "@/types/review.type";

export const operatingSystems: TOperatingSystem[] = [
  "android",
  "ios",
  "linux",
  "macos",
  "windows",
];

export const operatingSystemOptions = operatingSystems.map((os) => ({
  label: os,
  value: os,
}));

export const chargingPorts: TChargingPort[] = [
  "usb-c",
  "lightning",
  "micro-usb",
];

export const chargingPortOptions = chargingPorts.map((port) => ({
  label: port,
  value: port,
}));

export const connectivities: TConnectivity[] = ["bluetooth", "wifi"];

export const connectivityOptions = connectivities.map((connectivity) => ({
  label: connectivity,
  value: connectivity,
}));

export const powerSources: TPowerSource[] = ["battery", "plug-in"];

export const powerSourceOptions = powerSources.map((source) => ({
  label: source,
  value: source,
}));

export const compatibilities: TCompatibility[] = [
  ...operatingSystems,
  "iphone",
  "android-phone",
  "laptop",
  "macbook",
];

export const compatibilityOptions = compatibilities.map((compatibility) => ({
  label: compatibility,
  value: compatibility,
}));

export const productReviewStatusOptions: TReviewStatus[] = [
  "approved",
  "pending",
  "rejected",
];
