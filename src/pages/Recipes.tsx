import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Recipes = () => {
  const { data: recipes = [], isLoading } = useQuery({
    queryKey: ["recipes-full"],
    queryFn: async () => {
      const { data, error } = await supabase.from("recipes").select("*, products(*), recipe_ingredients(*, ingredients(*))");
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Recipes & Formulations</h1>
          <p className="text-muted-foreground mt-1">Define how products are made with precise ingredient quantities.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"><Plus className="h-4 w-4" /> New Recipe</Button>
      </div>

      {isLoading ? <p className="text-muted-foreground">Loading...</p> : recipes.length === 0 ? (
        <p className="text-muted-foreground">No recipes yet. Create your first recipe!</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recipes.map((r: any) => (
            <Card key={r.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="font-heading text-xl">{r.products?.name || "Unknown"}</CardTitle>
                    <p className="text-sm text-muted-foreground">{r.products?.variant} • {r.name || "Default Recipe"}</p>
                  </div>
                  <Badge variant="outline">{r.products?.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Ingredients per unit</p>
                <div className="space-y-2">
                  {r.recipe_ingredients?.map((ri: any, i: number) => (
                    <div key={i} className="flex justify-between items-center py-1.5 border-b border-border last:border-0">
                      <span className="text-sm text-foreground">{ri.ingredients?.name}</span>
                      <span className="text-sm font-medium text-muted-foreground">{ri.quantity} {ri.ingredients?.unit}</span>
                    </div>
                  ))}
                  {(!r.recipe_ingredients || r.recipe_ingredients.length === 0) && (
                    <p className="text-sm text-muted-foreground">No ingredients defined yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;
