import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, Package, Leaf, AlertTriangle } from "lucide-react";

const reportTypes = [
  { title: "Inventory Summary", desc: "Current stock levels for all products and ingredients", icon: Package },
  { title: "Batch Production Report", desc: "Production history with quantities and dates", icon: BarChart3 },
  { title: "Ingredient Usage Report", desc: "Raw material consumption over time", icon: Leaf },
  { title: "Defect/Wastage Report", desc: "Analysis of defective items and waste trends", icon: AlertTriangle },
];

const Reports = () => (
  <div className="space-y-6 animate-fade-in">
    <div>
      <h1 className="font-heading text-3xl font-bold text-foreground">Reports</h1>
      <p className="text-muted-foreground mt-1">Generate and export operational reports.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {reportTypes.map((r, i) => (
        <Card key={i} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <r.icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{r.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{r.desc}</p>
              <Button variant="outline" size="sm" className="mt-3 gap-2">
                <Download className="h-3.5 w-3.5" /> Generate
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default Reports;
