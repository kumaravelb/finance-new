import { DollarSign, TrendingUp, CreditCard, Activity } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const monthlyData = [
  { month: "Jan", revenue: 4500, expenses: 2400 },
  { month: "Feb", revenue: 5200, expenses: 2800 },
  { month: "Mar", revenue: 4800, expenses: 2200 },
  { month: "Apr", revenue: 6100, expenses: 3100 },
  { month: "May", revenue: 5800, expenses: 2900 },
  { month: "Jun", revenue: 7200, expenses: 3400 },
];

const performanceData = [
  { name: "Mon", value: 2400 },
  { name: "Tue", value: 3200 },
  { name: "Wed", value: 2800 },
  { name: "Thu", value: 3900 },
  { name: "Fri", value: 4200 },
  { name: "Sat", value: 3100 },
  { name: "Sun", value: 2900 },
];

export default function Overview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's your financial summary.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          change="+20.1%"
          icon={DollarSign}
          trend="up"
        />
        <StatCard
          title="Active Investments"
          value="$12,234.00"
          change="+12.5%"
          icon={TrendingUp}
          trend="up"
        />
        <StatCard
          title="Total Expenses"
          value="$8,492.00"
          change="-4.3%"
          icon={CreditCard}
          trend="down"
        />
        <StatCard
          title="Net Profit"
          value="$18,239.89"
          change="+8.2%"
          icon={Activity}
          trend="up"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
            <CardDescription>Monthly comparison for the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="revenue" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
                <Bar dataKey="expenses" fill="hsl(var(--chart-2))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
            <CardDescription>Transaction activity over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-1))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
