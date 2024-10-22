import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {Category} from './category';
import {OrderItem} from './orderItem';

@Entity({name: 'product'})
export class Product {
    @PrimaryGeneratedColumn()
    product_id!: number;

    @Column()
    sku!: string;

    @Column()
    name!: string;

    @Column()
    import_price!: number;

    @Column()
    count!: number;

    @Column({nullable: true})
    description?: string;

    @ManyToOne(() => Category, (category) => category.products)
    category!: Category;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    orderItems?: OrderItem[];
}
