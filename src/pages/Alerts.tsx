import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AlertTriangle, Bell, Check, CheckCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const Alerts = () => {
  const queryClient = useQueryClient();

  const { data: alerts = [], isLoading } = useQuery({
    queryKey: ["alerts-all"],
    queryFn: async () => {
      const { data, error } = await supabase.from("alerts").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const resolveMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("alerts").update({ resolved: true }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts-all"] });
      queryClient.invalidateQueries({ queryKey: ["alerts-unresolved"] });
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      toast.success("Alert resolved");
    },
  });

  const resolveAllMutation = useMutation({
    mutationFn: async () => {
      const unresolvedIds = alerts.filter(a => !a.resolved).map(a => a.id);
      for (const id of unresolvedIds) {
        await supabase.from("alerts").update({ resolved: true }).eq("id", id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts-all"] });
      queryClient.invalidateQueries({ queryKey: ["alerts-unresolved"] });
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      toast.success("All alerts resolved");
    },
  });

  const unresolvedCount = alerts.filter(a => !a.resolved).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Alerts</h1>
          <p className="text-muted-foreground mt-1">System notifications for low stock, expiring items, and critical issues.</p>
        </div>
        {unresolvedCount > 0 && (
          <Button variant="outline" size="sm" onClick={() => resolveAllMutation.mutate()} disabled={resolveAllMutation.isPending} className="gap-2">
            <CheckCheck className="h-4 w-4" /> Resolve All ({unresolvedCount})
          </Button>
        )}
      </div>
      {isLoading ? <p className="text-muted-foreground">Loading...</p> : alerts.length === 0 ? (
        <p className="text-muted-foreground">No alerts at this time.</p>
      ) : (
        <div className="space-y-3">
          {alerts.map(a => (
            <Card key={a.id} className={`${a.urgent && !a.resolved ? "border-destructive/30" : ""} ${a.resolved ? "opacity-60" : ""}`}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${a.urgent ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"}`}>
                  {a.urgent ? <AlertTriangle className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{a.message}</p>
                    <Badge variant="outline" className="text-[10px] shrink-0">{a.type}</Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleString()}</p>
                    {a.item_name && <span className="text-xs text-muted-foreground">• {a.item_name}</span>}
                  </div>
                </div>
                {a.resolved ? (
                  <span className="text-xs font-medium text-success">Resolved</span>
                ) : (
                  <div className="flex items-center gap-2">
                    {a.urgent && <span className="text-xs font-semibold text-destructive uppercase">Urgent</span>}
                    <Button variant="ghost" size="sm" onClick={() => resolveMutation.mutate(a.id)} disabled={resolveMutation.isPending} className="gap-1 text-xs">
                      <Check className="h-3.5 w-3.5" /> Resolve
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Alerts;
