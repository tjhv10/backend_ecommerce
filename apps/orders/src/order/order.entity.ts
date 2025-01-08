import { Directive, Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ItemsOrder } from "../items_order/ItemOrder.entity";

@ObjectType()
@Entity({ name: "orders" })
@Directive("@shareable")
export class Order {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Date)
  @Column({ nullable: true, name: "order_date" })
  orderDate: Date;

  @OneToMany(() => ItemsOrder, (ItemOrder) => ItemOrder.order, {
    onDelete: "CASCADE",
  })
  @Field(() => [ItemsOrder])
  itemsOrder: ItemsOrder[];
}
