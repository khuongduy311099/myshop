import {OrderItem} from '../entity/orderItem';

export interface IOrder {
    order_id: number;
    created_Time: Date;
    final_price: number;
    orderItems?: OrderItem[]; // optional relationship
}
