import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { recipes, products, ingredients } from "@/data/sampleData";

const Recipes = () => {
  const getProduct = (id: string) => products.find(p => p.id === id);
  const getIngredient = (id: string) => ingredients.find(i => i.id === id);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Recipes & Formulations</h1>
          <p className="text-muted-foreground mt-1">Define how products are made with precise ingredient quantities.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"><Plus className="h-4 w-4" /> New Recipe</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recipes.map(r => {
          const product = getProduct(r.productId);
          return (
            <Card key={r.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="font-heading text-xl">{product?.name || "Unknown"}</CardTitle>
                    <p className="text-sm text-muted-foreground">{product?.variant} • {r.id}</p>
                  </div>
                  <Badge variant="outline">{product?.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Ingredients per unit</p>
                <div className="space-y-2">
                  {r.ingredients.map((ri, i) => {
                    const ing = getIngredient(ri.ingredientId);
                    return (
                      <div key={i} className="flex justify-between items-center py-1.5 border-b border-border last:border-0">
                        <span className="text-sm text-foreground">{ing?.name}</span>
                        <span className="text-sm font-medium text-muted-foreground">{ri.quantity} {ing?.unit}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Recipes;
