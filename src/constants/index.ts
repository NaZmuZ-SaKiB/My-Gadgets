export * from "./assets";
export * from "./adminSidebar";
export * from "./sortOptions";

export const backendUrl = process.env.BACKEND_URL;
export const authKey = "mg-jwt";
export const USER_ROLE = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  USER: "user",
} as const;
