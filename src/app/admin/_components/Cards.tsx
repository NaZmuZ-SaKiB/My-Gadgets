"use client";

import { useDashboardQuery } from "@/lib/queries/user.query";
import { cn } from "@/lib/utils";
import { TDashboard } from "@/types/user.type";
import { formatCurrency } from "@/utils/currencyFormat";
import {
  DollarSign,
  ShoppingBag,
  ShoppingCart,
  Star,
  TrendingUp,
  User,
} from "lucide-react";

const dashboardCardsData = [
  {
    field: "totalUsers",
    label: "Total Users",
    icon: User,
    bgStyle: "bg-gradient-to-br from-green-600 to-green-300",
  },
  {
    field: "totalOrders",
    label: "Total Orders",
    icon: ShoppingCart,
    bgStyle: "bg-gradient-to-br from-purple-600 to-purple-300",
  },
  {
    field: "totalSale",
    label: "Total Sale",
    icon: DollarSign,
    bgStyle: "bg-gradient-to-br from-blue-600 to-blue-500",
  },
  {
    field: "totalProducts",
    label: "Total Products",
    icon: ShoppingBag,
    bgStyle: "bg-gradient-to-br from-blue-600 to-sky-300",
  },
  {
    field: "totalReviews",
    label: "Total Reviews",
    icon: Star,
    bgStyle: "bg-gradient-to-br from-yellow-600 to-yellow-300",
  },
];

const Cards = () => {
  const { data, isLoading } = useDashboardQuery();
  const dashboardData: TDashboard = data?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid gap-5 xs:grid-cols-2 md:grid-cols-3">
      {dashboardCardsData.map((card) => (
        <div
          key={`dashboard-card-${card.field}`}
          className={cn(card.bgStyle, "relative rounded-xl p-4 text-slate-50", {
            "background-grid row-span-2 max-md:order-5 max-md:h-80 xs:col-span-2 md:col-span-1":
              card.field === "totalSale",
          })}
        >
          <div className="relative z-50 flex items-center justify-between">
            <span className="text-xl">{card.label}</span>

            <span className="rounded-lg bg-gradient-to-t from-black/20 to-black/5 p-3">
              <card.icon />
            </span>
          </div>
          <div className="relative z-50 mt-5 text-4xl font-semibold">
            {card.field === "totalSale"
              ? formatCurrency(dashboardData[card.field])
              : dashboardData[card.field]}
          </div>

          <div className="absolute bottom-0 left-0 z-10">
            <TrendingUp
              className={cn("size-28 text-black/10", {
                "size-48": card.field === "totalSale",
              })}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
