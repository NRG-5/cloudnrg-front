"use client"


import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useState} from "react";
export const description = "An interactive area chart"
const chartData = [
    { date: "2024-05-27", usage: 880 },
    { date: "2024-05-28", usage: 423 },
    { date: "2024-05-29", usage: 208 },
    { date: "2024-05-30", usage: 620 },
    { date: "2024-05-31", usage: 408 },
    { date: "2024-06-01", usage: 378 },
    { date: "2024-06-02", usage: 880 },
    { date: "2024-06-03", usage: 263 },
    { date: "2024-06-04", usage: 819 },
    { date: "2024-06-05", usage: 228 },
    { date: "2024-06-06", usage: 544 },
    { date: "2024-06-07", usage: 693 },
    { date: "2024-06-08", usage: 705 },
    { date: "2024-06-09", usage: 918 },
    { date: "2024-06-10", usage: 355 },
    { date: "2024-06-11", usage: 242 },
    { date: "2024-06-12", usage: 912 },
    { date: "2024-06-13", usage: 211 },
    { date: "2024-06-14", usage: 806 },
    { date: "2024-06-15", usage: 657 },
    { date: "2024-06-16", usage: 681 },
    { date: "2024-06-17", usage: 995 },
    { date: "2024-06-18", usage: 277 },
    { date: "2024-06-19", usage: 631 },
    { date: "2024-06-20", usage: 858 },
    { date: "2024-06-21", usage: 379 },
    { date: "2024-06-22", usage: 587 },
    { date: "2024-06-23", usage: 1010 },
    { date: "2024-06-24", usage: 312 },
    { date: "2024-06-25", usage: 331 },
    { date: "2024-06-26", usage: 814 },
    { date: "2024-06-27", usage: 938 },
    { date: "2024-06-28", usage: 349 },
    { date: "2024-06-29", usage: 263 },
    { date: "2024-06-30", usage: 846 },
];
const chartConfig = {
    usage: {
        label: "Usage",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig

export default function UsageChart(){

    const [timeRange, setTimeRange] = useState("90d")
    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2024-06-30")
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

    return (
        <Card className="pt-0">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Traffic / Usage</CardTitle>
                    <CardDescription>
                        Showing total usage for the last 3 months
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillUsage" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-usage)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-usage)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="usage"
                            type="natural"
                            fill="url(#fillUsage)"
                            stroke="var(--color-usage)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}