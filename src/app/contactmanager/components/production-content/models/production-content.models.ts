import { OrderForm } from "../../components-models/order-form.model";

export interface ClientTable {
    data: OrderForm[];
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
}