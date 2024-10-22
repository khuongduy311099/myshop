import {Order} from '../entity/order';
import {Product} from '../entity/product';

export interface IOrderItem {
    order_item_id: number;
    quantity: number;
    unit_sale_price: number;
    total_price: number;
    order?: Order; // optional relationship
    product?: Product; // optional relationship
}
