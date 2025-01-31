"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

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
import { useDashboardQuery } from "@/lib/queries/user.query";
import { TDashboard } from "@/types/user.type";
import { cn } from "@/lib/utils";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  number: {
    label: "Orders",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-1))",
  },
  processing: {
    label: "Processing",
    color: "hsl(var(--chart-2))",
  },
  shipped: {
    label: "Shipped",
    color: "hsl(var(--chart-3))",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-4))",
  },
  canceled: {
    label: "Canceled",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const OrdersPieChart = () => {
  const { data, isLoading } = useDashboardQuery();
  const dashboardData: TDashboard = data?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const chartData = [
    {
      status: "pending",
      number: dashboardData?.pendingOrders,
      fill: "#DD2EFE",
    },
    {
      status: "processing",
      number: dashboardData?.processingOrders,
      fill: "#EDB113",
    },
    {
      status: "shipped",
      number: dashboardData?.shippedOrders,
      fill: "#4094F1",
    },
    {
      status: "completed",
      number: dashboardData?.completedOrders,
      fill: "#27BF68",
    },
    {
      status: "canceled",
      number: dashboardData?.canceledOrders,
      fill: "#FD2E4E",
    },
  ];

  return (
    <AFloatingBox className="max-xl:mt-4">
      <h2 className="text-lg font-medium text-slate-700">Orders Overview</h2>

      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[220px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="number"
            nameKey="status"
            innerRadius={45}
            labelLine={false}
            label={renderCustomizedLabel}
          />
        </PieChart>
      </ChartContainer>

      <div>
        {chartData.map((item) => (
          <div
            key={`order-overview-${item.status}`}
            className="flex items-center justify-between gap-4 border-t p-2"
          >
            <div className="flex items-center gap-4">
              <span
                style={{ background: item.fill }}
                className={cn("inline-block size-5 rounded-full")}
              ></span>
              <span className="capitalize">{item.status}</span>
            </div>
            <span>{item.number}</span>
          </div>
        ))}
      </div>
    </AFloatingBox>
  );
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {value}
    </text>
  );
};

export default OrdersPieChart;
