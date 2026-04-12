import { useState } from "react";
import { Search, Plus, Pencil, Trash2, Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { suppliers } from "@/data/sampleData";

const Suppliers = () => {
  const [search, setSearch] = useState("");
  const filtered = suppliers.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Suppliers</h1>
          <p className="text-muted-foreground mt-1">Manage supplier contacts and information.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"><Plus className="h-4 w-4" /> Add Supplier</Button>
      </div>
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search suppliers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-9" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(s => (
          <Card key={s.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.id}</p>
                </div>
                <div className="flex gap-1">
                  <button className="text-muted-foreground hover:text-foreground p-1"><Pencil className="h-4 w-4" /></button>
                  <button className="text-muted-foreground hover:text-destructive p-1"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="space-y-1.5 text-sm text-muted-foreground">
                <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> {s.contact}</p>
                <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> {s.email}</p>
                <p className="text-xs">{s.address}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Suppliers;
