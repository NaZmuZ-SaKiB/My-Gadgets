"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", sales: 15438923, profit: 8894753, expense: 1834092 },
  { month: "February", sales: 24321045, profit: 10721093, expense: 2291854 },
  { month: "March", sales: 30562318, profit: 7357904, expense: 3643298 },
  { month: "April", sales: 21748211, profit: 12291804, expense: 2512784 },
  { month: "May", sales: 10934672, profit: 8692378, expense: 1197438 },
  { month: "June", sales: 12548239, profit: 5092841, expense: 2724835 },
  { month: "July", sales: 18738204, profit: 8791038, expense: 3643210 },
  { month: "August", sales: 26238174, profit: 12819205, expense: 2512374 },
  { month: "September", sales: 25372019, profit: 14012345, expense: 1832104 },
  { month: "October", sales: 13284502, profit: 12987104, expense: 2241953 },
  { month: "November", sales: 30347182, profit: 10890321, expense: 3534982 },
  { month: "December", sales: 27123409, profit: 13093284, expense: 2298103 },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#64B3F5",
  },
  profit: {
    label: "Profit",
    color: "#4FD988",
  },
  expense: {
    label: "Expense",
    color: "#ED68FF",
  },
} satisfies ChartConfig;

const SalesChart = () => {
  return (
    <div>
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <defs>
            <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#64B3F5" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#64B3F5" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="fillProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4FD988" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4FD988" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ED68FF" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ED68FF" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            dataKey="expense"
            type="natural"
            fill="url(#fillExpense)"
            fillOpacity={0.4}
            stroke="#ED68FF"
            stackId="a"
          />
          <Area
            dataKey="profit"
            type="natural"
            fill="url(#fillProfit)"
            fillOpacity={0.4}
            stroke="#4FD988"
            stackId="a"
          />
          <Area
            dataKey="sales"
            type="natural"
            fill="url(#fillSales)"
            fillOpacity={0.4}
            stroke="#64B3F5"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>

      <div className="mt-4 flex w-full items-start gap-2 text-sm">
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          January - December 2024
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
