"use client"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"


import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radial chart with stacked sections"


const chartConfig = {
  buget: {
    label: "Buget",
    color: "#818cf8",
  },
  spent: {
    label: "Spent",
    color: "#10b981",
  },
} satisfies ChartConfig



export function ChartPage({ budget, spent }: any) {

  const chartData = [{ buget: budget, spent: spent }]


  return (
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square w-full max-w-[250px] h-fit"
      >
        <RadialBarChart
          data={chartData}
          endAngle={180}
          innerRadius={80}
          outerRadius={130}
        >
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
  

          <RadialBar
            dataKey="buget"
            stackId="a"
            cornerRadius={5}
            fill="#818cf8"
            className="stroke-transparent stroke-2"
          />
          <RadialBar
            dataKey="spent"
            fill="#10b981"
            stackId="a"
            cornerRadius={5}
            className="stroke-transparent stroke-2"
          />
        </RadialBarChart>
      </ChartContainer>
  )
}
