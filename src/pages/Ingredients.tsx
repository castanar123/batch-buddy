import { useState } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ingredients, suppliers } from "@/data/sampleData";

const Ingredients = () => {
  const [search, setSearch] = useState("");

  const filtered = ingredients.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
  const getSupplier = (id: string) => suppliers.find(s => s.id === id);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Ingredients</h1>
          <p className="text-muted-foreground mt-1">Manage raw materials and packaging supplies.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <Plus className="h-4 w-4" /> Add Ingredient
        </Button>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search ingredients..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-9" />
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</th>
                <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Unit</th>
                <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Current Stock</th>
                <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Min Stock</th>
                <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Supplier</th>
                <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Expiration</th>
                <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(i => {
                const isLow = i.currentStock <= i.minStock;
                const supplier = getSupplier(i.supplierId);
                return (
                  <tr key={i.id} className={`border-b border-border last:border-0 hover:bg-muted/30 transition-colors ${isLow ? "bg-destructive/5" : ""}`}>
                    <td className="p-4 text-sm font-medium text-foreground">{i.name}</td>
                    <td className="p-4 text-sm text-muted-foreground">{i.unit}</td>
                    <td className="p-4 text-sm font-medium text-foreground">{i.currentStock}</td>
                    <td className="p-4 text-sm text-muted-foreground">{i.minStock}</td>
                    <td className="p-4 text-sm text-muted-foreground">{supplier?.name || "-"}</td>
                    <td className="p-4 text-sm text-muted-foreground">{i.expirationDate}</td>
                    <td className="p-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${isLow ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success"}`}>
                        {isLow ? "LOW" : "OK"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button className="text-muted-foreground hover:text-foreground"><Pencil className="h-4 w-4" /></button>
                        <button className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Ingredients;
