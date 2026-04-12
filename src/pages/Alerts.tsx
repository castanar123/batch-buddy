import { AlertTriangle, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { alerts } from "@/data/sampleData";

const Alerts = () => (
  <div className="space-y-6 animate-fade-in">
    <div>
      <h1 className="font-heading text-3xl font-bold text-foreground">Alerts</h1>
      <p className="text-muted-foreground mt-1">System notifications for low stock and expiring items.</p>
    </div>
    <div className="space-y-3">
      {alerts.map(a => (
        <Card key={a.id} className={a.urgent ? "border-destructive/30" : ""}>
          <CardContent className="p-4 flex items-center gap-4">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${a.urgent ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"}`}>
              {a.urgent ? <AlertTriangle className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{a.message}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{a.date}</p>
            </div>
            {a.urgent && <span className="text-xs font-semibold text-destructive uppercase">Urgent</span>}
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default Alerts;
