import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";

const portfolioData = [
  { month: "Jan", stocks: 12000, bonds: 8000, crypto: 3000 },
  { month: "Feb", stocks: 15000, bonds: 8500, crypto: 4000 },
  { month: "Mar", stocks: 14000, bonds: 9000, crypto: 3500 },
  { month: "Apr", stocks: 18000, bonds: 9500, crypto: 5000 },
  { month: "May", stocks: 17000, bonds: 10000, crypto: 4800 },
  { month: "Jun", stocks: 21000, bonds: 11000, crypto: 6200 },
];

const categoryData = [
  { name: "Stocks", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Bonds", value: 30, color: "hsl(var(--chart-2))" },
  { name: "Crypto", value: 15, color: "hsl(var(--chart-3))" },
  { name: "Cash", value: 10, color: "hsl(var(--chart-4))" },
];

const performanceMetrics = [
  { label: "YTD Return", value: "+24.5%", change: "up" },
  { label: "Best Performing", value: "Tech Stocks", change: "up" },
  { label: "Portfolio Diversity", value: "8.2/10", change: "up" },
  { label: "Risk Level", value: "Moderate", change: "neutral" },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Detailed insights into your portfolio performance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {performanceMetrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="pb-2">
              <CardDescription className="text-xs">{metric.label}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Growth</CardTitle>
            <CardDescription>Asset value trends over 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={portfolioData}>
                <defs>
                  <linearGradient id="stocks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="bonds" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="crypto" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                <Area type="monotone" dataKey="stocks" stroke="hsl(var(--chart-1))" fillOpacity={1} fill="url(#stocks)" />
                <Area type="monotone" dataKey="bonds" stroke="hsl(var(--chart-2))" fillOpacity={1} fill="url(#bonds)" />
                <Area type="monotone" dataKey="crypto" stroke="hsl(var(--chart-3))" fillOpacity={1} fill="url(#crypto)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Current portfolio distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
