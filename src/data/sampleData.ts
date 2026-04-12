// Sample data for the Elline Food Products Inventory Management System

export interface Product {
  id: string;
  name: string;
  category: string;
  variant: string;
  shelfLife: number;
  quantity: number;
  status: "in-stock" | "low-stock" | "expiring" | "out-of-stock";
  expirationDate: string;
  createdAt: string;
}

export interface Ingredient {
  id: string;
  name: string;
  unit: string;
  currentStock: number;
  minStock: number;
  supplierId: string;
  expirationDate: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  address: string;
}

export interface Recipe {
  id: string;
  productId: string;
  ingredients: { ingredientId: string; quantity: number }[];
}

export interface Batch {
  id: string;
  productId: string;
  quantityPlanned: number;
  quantityProduced: number;
  productionDate: string;
  expirationDate: string;
  status: "planned" | "in-progress" | "completed";
}

export interface StockMovement {
  id: string;
  type: "IN" | "OUT" | "ADJUSTMENT";
  itemType: "ingredient" | "product";
  itemId: string;
  itemName: string;
  quantity: number;
  date: string;
  remarks: string;
  user: string;
}

export interface Alert {
  id: string;
  type: "low-stock" | "expiring" | "critical";
  message: string;
  itemName: string;
  date: string;
  urgent: boolean;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  module: string;
  timestamp: string;
  details: string;
}

export const products: Product[] = [
  { id: "P001", name: "Banana Ketchup", category: "Produce", variant: "1L", shelfLife: 365, quantity: 310, status: "in-stock", expirationDate: "2026-10-12", createdAt: "2025-01-15" },
  { id: "P002", name: "Soy Sauce", category: "Produce", variant: "1L", shelfLife: 730, quantity: 12, status: "expiring", expirationDate: "2026-04-05", createdAt: "2024-06-20" },
  { id: "P003", name: "Vinegar", category: "Produce", variant: "1L", shelfLife: 545, quantity: 120, status: "low-stock", expirationDate: "2026-07-21", createdAt: "2024-11-03" },
  { id: "P004", name: "Garlic Vinegar", category: "Specialty", variant: "250ml", shelfLife: 365, quantity: 450, status: "in-stock", expirationDate: "2027-01-15", createdAt: "2025-03-10" },
  { id: "P005", name: "Spicy Ketchup", category: "Produce", variant: "500ml", shelfLife: 365, quantity: 0, status: "out-of-stock", expirationDate: "2026-08-30", createdAt: "2025-02-28" },
  { id: "P006", name: "Chili Sauce", category: "Condiments", variant: "350ml", shelfLife: 365, quantity: 220, status: "in-stock", expirationDate: "2027-03-14", createdAt: "2025-04-01" },
  { id: "P007", name: "Fish Sauce", category: "Condiments", variant: "750ml", shelfLife: 730, quantity: 85, status: "in-stock", expirationDate: "2027-08-20", createdAt: "2025-01-10" },
  { id: "P008", name: "Oyster Sauce", category: "Condiments", variant: "500ml", shelfLife: 365, quantity: 5, status: "low-stock", expirationDate: "2026-05-18", createdAt: "2025-03-22" },
];

export const ingredients: Ingredient[] = [
  { id: "I001", name: "Tomato Paste", unit: "kg", currentStock: 15, minStock: 20, supplierId: "S001", expirationDate: "2026-06-15" },
  { id: "I002", name: "Sugar", unit: "kg", currentStock: 200, minStock: 50, supplierId: "S002", expirationDate: "2027-01-20" },
  { id: "I003", name: "Salt", unit: "kg", currentStock: 180, minStock: 30, supplierId: "S002", expirationDate: "2028-03-10" },
  { id: "I004", name: "Garlic Powder", unit: "kg", currentStock: 5, minStock: 10, supplierId: "S003", expirationDate: "2026-09-01" },
  { id: "I005", name: "Vinegar Base", unit: "liters", currentStock: 500, minStock: 100, supplierId: "S001", expirationDate: "2027-05-15" },
  { id: "I006", name: "Chili Flakes", unit: "kg", currentStock: 40, minStock: 15, supplierId: "S003", expirationDate: "2026-12-01" },
  { id: "I007", name: "Soy Extract", unit: "liters", currentStock: 300, minStock: 80, supplierId: "S004", expirationDate: "2027-02-28" },
  { id: "I008", name: "250ml Glass Bottle", unit: "pcs", currentStock: 2000, minStock: 500, supplierId: "S005", expirationDate: "N/A" },
  { id: "I009", name: "1L Plastic Bottle", unit: "pcs", currentStock: 1500, minStock: 300, supplierId: "S005", expirationDate: "N/A" },
  { id: "I010", name: "Front Label", unit: "pcs", currentStock: 3000, minStock: 1000, supplierId: "S005", expirationDate: "N/A" },
];

export const suppliers: Supplier[] = [
  { id: "S001", name: "Fresh Farms Co.", contact: "+63 917 123 4567", email: "orders@freshfarms.ph", address: "Lot 5 Industrial Park, Bulacan" },
  { id: "S002", name: "Manila Sugar Mills", contact: "+63 918 234 5678", email: "supply@manilasugar.com", address: "Brgy. San Juan, Pampanga" },
  { id: "S003", name: "Spice Route Trading", contact: "+63 919 345 6789", email: "info@spiceroute.ph", address: "Davao Export Zone" },
  { id: "S004", name: "Pacific Soy Inc.", contact: "+63 920 456 7890", email: "sales@pacificsoy.com", address: "Subic Bay Freeport" },
  { id: "S005", name: "Global Pack Solutions", contact: "+63 921 567 8901", email: "order@globalpack.ph", address: "Cavite Industrial Estate" },
];

export const batches: Batch[] = [
  { id: "B001", productId: "P001", quantityPlanned: 500, quantityProduced: 495, productionDate: "2025-10-10", expirationDate: "2026-10-10", status: "completed" },
  { id: "B002", productId: "P002", quantityPlanned: 200, quantityProduced: 198, productionDate: "2025-09-15", expirationDate: "2027-09-15", status: "completed" },
  { id: "B003", productId: "P004", quantityPlanned: 300, quantityProduced: 0, productionDate: "2026-04-15", expirationDate: "2027-04-15", status: "planned" },
  { id: "B004", productId: "P006", quantityPlanned: 250, quantityProduced: 120, productionDate: "2026-04-12", expirationDate: "2027-04-12", status: "in-progress" },
];

export const stockMovements: StockMovement[] = [
  { id: "M001", type: "IN", itemType: "ingredient", itemId: "I001", itemName: "Tomato Paste", quantity: 50, date: "2026-04-12T08:30:00", remarks: "New delivery from Fresh Farms", user: "Admin" },
  { id: "M002", type: "OUT", itemType: "ingredient", itemId: "I002", itemName: "Sugar", quantity: 25, date: "2026-04-12T09:15:00", remarks: "Used in Batch B004", user: "Admin" },
  { id: "M003", type: "IN", itemType: "product", itemId: "P001", itemName: "Banana Ketchup", quantity: 500, date: "2026-04-11T14:00:00", remarks: "Batch B001 completed", user: "Admin" },
  { id: "M004", type: "OUT", itemType: "product", itemId: "P006", itemName: "Chili Sauce", quantity: 100, date: "2026-04-11T16:30:00", remarks: "Dispatched to Central Hub", user: "Admin" },
  { id: "M005", type: "ADJUSTMENT", itemType: "ingredient", itemId: "I003", itemName: "Salt", quantity: -2, date: "2026-04-10T11:00:00", remarks: "Physical count correction", user: "Admin" },
];

export const alerts: Alert[] = [
  { id: "A001", type: "low-stock", message: "Tomato Paste is below critical level (15kg left)", itemName: "Tomato Paste", date: "2026-04-12", urgent: true },
  { id: "A002", type: "low-stock", message: "Garlic Powder is below critical level (5kg left)", itemName: "Garlic Powder", date: "2026-04-12", urgent: true },
  { id: "A003", type: "expiring", message: "Soy Sauce Batch B002 expires in 7 days", itemName: "Soy Sauce", date: "2026-04-12", urgent: true },
  { id: "A004", type: "low-stock", message: "Oyster Sauce stock critically low (5 units)", itemName: "Oyster Sauce", date: "2026-04-12", urgent: false },
  { id: "A005", type: "expiring", message: "Tomato Paste expires Jun 15", itemName: "Tomato Paste", date: "2026-04-11", urgent: false },
];

export const auditLogs: AuditLog[] = [
  { id: "L001", user: "Admin", action: "CREATE", module: "Batch Production", timestamp: "2026-04-12T09:00:00", details: "Created batch B004 for Chili Sauce" },
  { id: "L002", user: "Admin", action: "UPDATE", module: "Ingredients", timestamp: "2026-04-12T08:30:00", details: "Stock in: 50kg Tomato Paste" },
  { id: "L003", user: "Admin", action: "UPDATE", module: "Stock Movements", timestamp: "2026-04-11T16:30:00", details: "Dispatched 100 Chili Sauce to Central Hub" },
  { id: "L004", user: "Admin", action: "CREATE", module: "Products", timestamp: "2026-04-10T10:00:00", details: "Added new product: Spicy Ketchup 500ml" },
  { id: "L005", user: "Admin", action: "ADJUSTMENT", module: "Ingredients", timestamp: "2026-04-10T11:00:00", details: "Manual adjustment: Salt -2kg (physical count)" },
];

export const recipes: Recipe[] = [
  { id: "R001", productId: "P001", ingredients: [{ ingredientId: "I001", quantity: 0.5 }, { ingredientId: "I002", quantity: 0.3 }, { ingredientId: "I005", quantity: 0.2 }, { ingredientId: "I009", quantity: 1 }, { ingredientId: "I010", quantity: 1 }] },
  { id: "R002", productId: "P004", ingredients: [{ ingredientId: "I005", quantity: 0.25 }, { ingredientId: "I004", quantity: 0.02 }, { ingredientId: "I003", quantity: 0.01 }, { ingredientId: "I008", quantity: 1 }, { ingredientId: "I010", quantity: 1 }] },
  { id: "R003", productId: "P006", ingredients: [{ ingredientId: "I001", quantity: 0.3 }, { ingredientId: "I006", quantity: 0.1 }, { ingredientId: "I002", quantity: 0.15 }, { ingredientId: "I003", quantity: 0.02 }, { ingredientId: "I008", quantity: 1 }, { ingredientId: "I010", quantity: 1 }] },
];
