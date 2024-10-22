import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {OrderItem} from './orderItem';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    order_id!: number;

    @Column()
    created_Time!: Date;

    @Column()
    final_price!: number;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    orderItems?: OrderItem[];
}
