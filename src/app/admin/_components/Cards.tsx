"use client";

import {
  DollarSign,
  ShoppingBag,
  ShoppingCart,
  Star,
  TrendingUp,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";
import CardsLoader from "./CardsLoader";
import { TDashboard } from "@/types/user.type";
import { formatCurrency } from "@/utils/currencyFormat";
import { useDashboardQuery } from "@/lib/queries/user.query";

const dashboardCardsData = [
  {
    field: "totalUsers",
    label: "Total Users",
    icon: User,
    bgStyle: "bg-gradient-to-r from-green-600 to-green-400",
    color: "text-green-600",
  },
  {
    field: "totalOrders",
    label: "Total Orders",
    icon: ShoppingCart,
    bgStyle: "bg-gradient-to-r from-purple-600 to-purple-400",
    color: "text-purple-600",
  },
  {
    field: "totalSale",
    label: "Total Sale",
    icon: DollarSign,
    bgStyle: "bg-gradient-to-r from-blue-600 to-blue-500",
    color: "text-blue-600",
  },
  {
    field: "totalProducts",
    label: "Total Products",
    icon: ShoppingBag,
    bgStyle: "bg-gradient-to-r from-blue-600 to-sky-400",
    color: "text-blue-600",
  },
  {
    field: "totalReviews",
    label: "Total Reviews",
    icon: Star,
    bgStyle: "bg-gradient-to-r from-yellow-600 to-yellow-400",
    color: "text-yellow-600",
  },
];

const randomPercentage = () => Math.floor(Math.random() * (30 - 10 + 1)) + 10;

const Cards = () => {
  const { data, isLoading } = useDashboardQuery();
  const dashboardData: TDashboard = data?.data;

  if (isLoading) {
    return <CardsLoader />;
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
          <div className="relative z-50 flex items-start justify-between">
            <div>
              <span className="text-lg font-medium">{card.label}</span>
              <div className="mt-0.5 text-4xl font-semibold">
                {card.field === "totalSale"
                  ? formatCurrency(dashboardData[card.field])
                  : dashboardData[card.field]}
              </div>
            </div>

            <span className="rounded-lg bg-gradient-to-tl from-black/20 to-black/5 p-3">
              <card.icon />
            </span>
          </div>

          <div
            className={cn(
              "relative z-50 mt-10 flex items-center gap-2 text-sm",
              {
                "mt-2": card.field === "totalSale",
              },
            )}
          >
            <span className="rounded bg-black/30 p-1 text-xs">
              +{randomPercentage()}%
            </span>
            <span>Last Month</span>
          </div>

          <div className="absolute bottom-2 left-0 z-10">
            <TrendingUp
              className={cn("size-28", card.color, {
                "size-48 text-black opacity-10": card.field === "totalSale",
              })}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
