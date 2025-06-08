"use client"

import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import * as React from "react";
export const description = "A pie chart with a label list"
const chartData = [
    { type: "jpg", files: 10, fill: "var(--color-jpg)" },
    { type: "png", files: 12, fill: "var(--color-png)" },
    { type: "mp4", files: 4, fill: "var(--color-mp4)" },
    { type: "other", files: 2, fill: "var(--color-other)" },
]
const chartConfig = {

    jpg: {
        label: "jpg",
        color: "var(--chart-1)",
    },
    png: {
        label: "png",
        color: "var(--chart-2)",
    },
    mp4: {
        label: "mp4",
        color: "var(--chart-3)",
    },
    other: {
        label: "Other",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig

export default function TypeFilesChart(){
    return (
        <Card className="pt-0">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Your Files</CardTitle>
                    <CardDescription>
                        The distribution of your files by type.
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent nameKey="type" hideLabel />}
                        />
                        <Pie data={chartData} dataKey="files">
                            <LabelList
                                dataKey="type"
                                className="fill-background"
                                stroke="none"
                                fontSize={12}
                                formatter={(value: keyof typeof chartConfig) =>
                                    chartConfig[value]?.label
                                }
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}