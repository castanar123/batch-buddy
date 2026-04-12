import { useState } from "react";
import { Search, Plus, Pencil, Trash2, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/sampleData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const statusStyles: Record<string, string> = {
  "in-stock": "bg-success/10 text-success border-success/20",
  "low-stock": "bg-warning/10 text-warning border-warning/20",
  "expiring": "bg-destructive/10 text-destructive border-destructive/20",
  "out-of-stock": "bg-muted text-muted-foreground border-border",
};

const statusLabels: Record<string, string> = {
  "in-stock": "IN STOCK",
  "low-stock": "LOW STOCK",
  "expiring": "EXPIRING",
  "out-of-stock": "OUT OF STOCK",
};

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const categories = [...new Set(products.map(p => p.category))];

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || p.category === category;
    return matchSearch && matchCat;
  });

  const stats = [
    { label: "TOTAL PRODUCTS", value: products.length.toLocaleString(), sub: "+12%" },
    { label: "OUT OF STOCK", value: String(products.filter(p => p.status === "out-of-stock").length), sub: "Critical", subColor: "text-destructive" },
    { label: "EXPIRING SOON", value: String(products.filter(p => p.status === "expiring").length), sub: "< 7 Days" },
    { label: "STOCK HEALTH", value: "94.2%", sub: "" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Product Ledger</h1>
          <p className="text-muted-foreground mt-1">Real-time oversight of artisanal inventory, stock health, and harvest timelines.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <Plus className="h-4 w-4" /> Add New Product
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className={`p-4 rounded-lg border ${i === 3 ? "bg-accent border-accent" : "bg-card border-border"}`}>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-heading text-foreground">{s.value}</span>
              {s.sub && <span className={`text-xs font-medium ${s.subColor || "text-muted-foreground"}`}>{s.sub}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Category:</span>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-40 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-9" />
        </div>
        <span className="text-sm text-muted-foreground ml-auto">Showing {filtered.length} of {products.length} results</span>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Product Name</th>
                  <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</th>
                  <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quantity</th>
                  <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Expiration Date</th>
                  <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{p.name} ({p.variant})</p>
                        <p className="text-xs text-muted-foreground">{p.id}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="text-xs font-normal">{p.category}</Badge>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium text-foreground">{p.quantity} Units</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground">{new Date(p.expirationDate).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}</span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${statusStyles[p.status]}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {statusLabels[p.status]}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button className="text-muted-foreground hover:text-foreground transition-colors"><Pencil className="h-4 w-4" /></button>
                        <button className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;
