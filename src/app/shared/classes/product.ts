// Products
export interface Product {
    id?: number;
    title?: string;
    description?: string;
    type?: string;
    brand?: string;
    collection?: any[];
    category?: string;
    price?: number;
    price_new?: number;
    sale?: boolean;
    discount?: number;
    mrp?: number;
    stock?: number;
    new?: boolean;
    quantity?: number;
    tags?: any[];
    hsn?:number;
    rate?:number;
    variants?: Variants[];
    sale_on_whatsapp?:number;
    images?: Images[];
}

export interface Variants {
    variant_id?: number;
    id?: number;
    sku?: string;
    size?: string;
    color?: string;
    image_id?: number;
}

export interface Images {
    image_id?: number;
    id?: number;
    alt?: string;
    src?: string;
    variant_id?: any[];
}