export interface ClientFilter {
    name: string;
    options: string[];
    defaultValue: string;
}

export interface ClientFilterOption {
    name: string;
    value: string;  
    isDefault: boolean;
}