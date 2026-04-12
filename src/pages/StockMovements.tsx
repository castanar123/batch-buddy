import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowDown, ArrowUp, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const typeIcons = { IN: ArrowDown, OUT: ArrowUp, ADJUSTMENT: RefreshCw };
const typeStyles = { IN: "text-success", OUT: "text-destructive", ADJUSTMENT: "text-warning" };

const StockMovements = () => {
  const { data: movements = [], isLoading } = useQuery({
    queryKey: ["stock_movements"],
    queryFn: async () => {
      const { data, error } = await supabase.from("stock_movements").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Stock Movements</h1>
        <p className="text-muted-foreground mt-1">Complete ledger of all inventory transactions.</p>
      </div>
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          {isLoading ? <div className="p-8 text-center text-muted-foreground">Loading...</div> : movements.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No stock movements recorded.</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Type", "Item", "Quantity", "Date", "Remarks"].map(h => (
                    <th key={h} className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {movements.map(m => {
                  const Icon = typeIcons[m.type];
                  return (
                    <tr key={m.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <span className={`flex items-center gap-1.5 text-sm font-medium ${typeStyles[m.type]}`}>
                          <Icon className="h-4 w-4" /> {m.type}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-foreground">{m.item_name}</td>
                      <td className="p-4 text-sm font-medium text-foreground">{m.quantity > 0 ? `+${m.quantity}` : m.quantity}</td>
                      <td className="p-4 text-sm text-muted-foreground">{new Date(m.created_at).toLocaleString()}</td>
                      <td className="p-4 text-sm text-muted-foreground">{m.remarks || "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StockMovements;
