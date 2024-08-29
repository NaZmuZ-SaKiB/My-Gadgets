import { TBrand } from "./brand.type";
import { TCategory } from "./category.type";
import { TMedia } from "./media.type";
import { TUser } from "./user.type";

export type TOperatingSystem =
  | "windows"
  | "macos"
  | "android"
  | "linux"
  | "ios";

export type TConnectivity = "bluetooth" | "wifi";

export type TChargingPort = "usb-c" | "lightning" | "micro-usb";

export type TPowerSource = "battery" | "plug-in";

export type TCompatibility =
  | TOperatingSystem
  | "iphone"
  | "android-phone"
  | "laptop"
  | "macbook";

export type TProduct = {
  _id: string;
  name: string;
  slug: string;
  model: string;
  quantity: number;
  salePrice: number;
  regularPrice: number;
  shippingCost: number;
  badgeText?: string;
  images: TMedia[];
  shortDescription: string;
  description: string;
  specifications: string;
  brand: TBrand;
  categories: TCategory[];
  operatingSystem?: TOperatingSystem;
  connectivity?: TConnectivity[];
  chargingPort?: TChargingPort;
  weight?: number;
  powerSource?: TPowerSource;
  camera?: number;
  displaySize?: number;
  compatibility?: TCompatibility[];

  createdAt: Date;
  updatedAt: Date;
  updatedBy?: TUser;
};
