export interface EquipmentProfile {
    type: "equipment";
}
  
export interface FurnitureProfile {
    backlog: number;
    color: string;
    available: boolean;
    type: "furniture";
    brand: string;
}

export interface IProduct {
    id: number;
    name: string;
    description: string;
    cost: number;
    profile: EquipmentProfile | FurnitureProfile;
    sku: string;
}