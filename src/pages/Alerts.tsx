import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AlertTriangle, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Alerts = () => {
  const { data: alerts = [], isLoading } = useQuery({
    queryKey: ["alerts-all"],
    queryFn: async () => {
      const { data, error } = await supabase.from("alerts").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Alerts</h1>
        <p className="text-muted-foreground mt-1">System notifications for low stock and expiring items.</p>
      </div>
      {isLoading ? <p className="text-muted-foreground">Loading...</p> : alerts.length === 0 ? (
        <p className="text-muted-foreground">No alerts at this time.</p>
      ) : (
        <div className="space-y-3">
          {alerts.map(a => (
            <Card key={a.id} className={a.urgent ? "border-destructive/30" : ""}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${a.urgent ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"}`}>
                  {a.urgent ? <AlertTriangle className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{a.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{new Date(a.created_at).toLocaleDateString()}</p>
                </div>
                {a.urgent && <span className="text-xs font-semibold text-destructive uppercase">Urgent</span>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Alerts;
