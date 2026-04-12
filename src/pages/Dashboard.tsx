import { Package, Leaf, AlertTriangle, Clock, ArrowDown, ArrowUp, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products, ingredients, alerts, stockMovements, batches } from "@/data/sampleData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const chartData = [
  { day: "MON", stockIn: 120, stockOut: 80 },
  { day: "TUE", stockIn: 150, stockOut: 100 },
  { day: "WED", stockIn: 200, stockOut: 180 },
  { day: "THU", stockIn: 280, stockOut: 220 },
  { day: "FRI", stockIn: 350, stockOut: 300 },
  { day: "SAT", stockIn: 420, stockOut: 280 },
  { day: "SUN", stockIn: 380, stockOut: 350 },
];

const statCards = [
  {
    title: "TOTAL PRODUCTS",
    value: "1,284",
    sub: "+12% this month",
    icon: Package,
    subIcon: TrendingUp,
    highlight: false,
  },
  {
    title: "AVAILABLE STOCK",
    value: "42,500",
    sub: "",
    icon: Package,
    highlight: true,
  },
  {
    title: "LOW STOCK ITEMS",
    value: String(ingredients.filter(i => i.currentStock <= i.minStock).length + products.filter(p => p.status === "low-stock").length),
    sub: "Requires immediate attention",
    icon: AlertTriangle,
    highlight: false,
  },
  {
    title: "EXPIRING SOON",
    value: String(batches.filter(b => b.status === "completed").length + products.filter(p => p.status === "expiring").length),
    sub: "Within 7 days",
    icon: Clock,
    highlight: false,
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Real-time status of Elline Food Products Stock.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <Card key={i} className={card.highlight ? "bg-secondary border-secondary" : "bg-card"}>
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{card.title}</p>
              <p className="text-3xl font-bold font-heading text-foreground mt-2">{card.value}</p>
              {card.sub && (
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                  {card.subIcon && <card.subIcon className="h-3 w-3 text-success" />}
                  {card.sub}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Stock Movement Trend</CardTitle>
            <p className="text-sm text-muted-foreground">Inflow vs Outflow analysis (weekly)</p>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="stockIn" stroke="hsl(var(--primary))" strokeWidth={2} name="Stock In" dot={false} />
                  <Line type="monotone" dataKey="stockOut" stroke="hsl(var(--secondary))" strokeWidth={2} name="Stock Out" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="font-heading text-lg">Recent Activity</CardTitle>
              <button className="text-xs text-primary font-semibold hover:underline">View All</button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {stockMovements.slice(0, 4).map((m) => (
              <div key={m.id} className="flex items-start gap-3">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                  m.type === "IN" ? "bg-success/10 text-success" : m.type === "OUT" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"
                }`}>
                  {m.type === "IN" ? <ArrowDown className="h-4 w-4" /> : m.type === "OUT" ? <ArrowUp className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {m.type === "IN" ? "New Stock Arrival" : m.type === "OUT" ? "Stock Dispatched" : "Adjustment"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{m.remarks}</p>
                  <p className="text-[10px] uppercase text-muted-foreground mt-1">
                    {new Date(m.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Active Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((a) => (
              <div key={a.id} className={`flex items-center gap-3 p-3 rounded-lg ${a.urgent ? "bg-destructive/5 border border-destructive/20" : "bg-warning/5 border border-warning/20"}`}>
                <AlertTriangle className={`h-4 w-4 shrink-0 ${a.urgent ? "text-destructive" : "text-warning"}`} />
                <p className="text-sm text-foreground flex-1">{a.message}</p>
                <span className="text-xs text-muted-foreground shrink-0">{a.date}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
