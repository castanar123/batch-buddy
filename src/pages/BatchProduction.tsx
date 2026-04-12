import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { batches, products } from "@/data/sampleData";

const batchStatusStyles: Record<string, string> = {
  planned: "bg-info/10 text-info border-info/20",
  "in-progress": "bg-warning/10 text-warning border-warning/20",
  completed: "bg-success/10 text-success border-success/20",
};

const BatchProduction = () => {
  const getProduct = (id: string) => products.find(p => p.id === id);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Batch Production</h1>
          <p className="text-muted-foreground mt-1">Create and track production batches with automatic ingredient deduction.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"><Plus className="h-4 w-4" /> New Batch</Button>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Batch ID", "Product", "Planned", "Produced", "Production Date", "Expiration", "Status"].map(h => (
                  <th key={h} className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {batches.map(b => {
                const product = getProduct(b.productId);
                return (
                  <tr key={b.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-sm font-medium text-foreground">{b.id}</td>
                    <td className="p-4 text-sm text-foreground">{product?.name} ({product?.variant})</td>
                    <td className="p-4 text-sm text-foreground">{b.quantityPlanned}</td>
                    <td className="p-4 text-sm text-foreground">{b.quantityProduced}</td>
                    <td className="p-4 text-sm text-muted-foreground">{b.productionDate}</td>
                    <td className="p-4 text-sm text-muted-foreground">{b.expirationDate}</td>
                    <td className="p-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${batchStatusStyles[b.status]}`}>
                        {b.status.toUpperCase()}
                      </span>
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

export default BatchProduction;
