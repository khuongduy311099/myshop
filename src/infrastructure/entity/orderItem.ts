import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Order} from './order';
import {Product} from './product';
import type {IProduct} from '../inteface/product';

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    order_item_id!: number;

    @Column()
    quantity!: number;

    @Column('float')
    unit_sale_price!: number;

    @Column('int')
    total_price!: number;

    @ManyToOne(() => Order, (order) => order.orderItems)
    order!: Order;

    @ManyToOne(() => Product, (product) => product.orderItems)
    product!: IProduct;
}
