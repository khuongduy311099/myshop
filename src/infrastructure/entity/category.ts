import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Product} from './product';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    category_id!: number;

    @Column({type: 'varchar', length: 255})
    name!: string;

    @Column({type: 'text', nullable: true})
    description!: string;

    @OneToMany(() => Product, (product) => product.category)
    products!: Product[];
}
