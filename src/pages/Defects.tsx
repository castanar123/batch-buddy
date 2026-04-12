import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const defects = [
  { id: "D001", batchId: "B001", quantity: 5, reason: "Broken Packaging", date: "2025-10-11" },
  { id: "D002", batchId: "B002", quantity: 2, reason: "Spoiled Material", date: "2025-09-16" },
  { id: "D003", batchId: "B004", quantity: 8, reason: "Machine Error", date: "2026-04-12" },
];

const Defects = () => (
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
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["Defect ID", "Batch ID", "Qty Defective", "Reason", "Date"].map(h => (
                <th key={h} className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {defects.map(d => (
              <tr key={d.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="p-4 text-sm font-medium text-foreground">{d.id}</td>
                <td className="p-4 text-sm text-foreground">{d.batchId}</td>
                <td className="p-4 text-sm text-destructive font-medium">{d.quantity}</td>
                <td className="p-4 text-sm text-muted-foreground">{d.reason}</td>
                <td className="p-4 text-sm text-muted-foreground">{d.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  </div>
);

export default Defects;
