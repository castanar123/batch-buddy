import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Defects = () => {
  const { data: defects = [], isLoading } = useQuery({
    queryKey: ["defects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("defects").select("*, batches(*, products(*))").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Defects & Wastage</h1>
          <p className="text-muted-foreground mt-1">Track defective items and production wastage.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"><Plus className="h-4 w-4" /> Log Defect</Button>
      </div>
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          {isLoading ? <div className="p-8 text-center text-muted-foreground">Loading...</div> : defects.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No defects recorded.</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Product", "Batch", "Qty Defective", "Reason", "Date"].map(h => (
                    <th key={h} className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {defects.map((d: any) => (
                  <tr key={d.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-sm text-foreground">{d.batches?.products?.name || "-"}</td>
                    <td className="p-4 text-sm font-medium text-foreground">{d.batch_id.slice(0, 8)}</td>
                    <td className="p-4 text-sm text-destructive font-medium">{d.quantity}</td>
                    <td className="p-4 text-sm text-muted-foreground">{d.reason || "-"}</td>
                    <td className="p-4 text-sm text-muted-foreground">{new Date(d.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Defects;
