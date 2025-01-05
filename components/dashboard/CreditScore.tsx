"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

const mockData = [
  { category: "Payment History", score: 85 },
  { category: "Credit Exposure", score: 72 },
  { category: "Credit Duration", score: 65 },
  { category: "Income Stability", score: 78 },
  { category: "Spending Pattern", score: 82 },
  { category: "Transaction Consistency", score: 70 },
];

export function CreditScore() {
  const overallScore = Math.round(
    mockData.reduce((acc, curr) => acc + curr.score, 0) / mockData.length
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Credit Score</CardTitle>
          <CardDescription>Your overall credit assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <div className="relative flex h-52 w-52 items-center justify-center rounded-full border-8 border-muted">
              <div className="flex flex-col items-center">
                <span className="text-5xl font-bold">{overallScore}</span>
                <span className="text-sm text-muted-foreground">out of 100</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Score Breakdown</CardTitle>
          <CardDescription>Detailed analysis of scoring factors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={mockData}>
                <PolarGrid />
                <PolarAngleAxis
                  dataKey="category"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}