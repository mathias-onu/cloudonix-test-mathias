export interface IProduct {
    id: number;
    name: string;
    description: string;
    cost: number;
    profile: IProductProfile;
    sku: string;
}

export interface IProductProfile {
    type: string;
    available: boolean;
    backlog: number;
}

export interface IProfileOption {
    name: string
}

export interface IEditPayload {
    name: string,
    description: string,
    cost: number,
    profile: IProductProfile
}
