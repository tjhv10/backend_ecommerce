import { Directive, Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ItemsOrder } from "../items_order/ItemOrder.entity";

@ObjectType()
@Entity({ name: "orders" })
@Directive("@shareable")
export class Order {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field(() => Date)
  @Column({ nullable: true })
  order_date: Date;

  @OneToMany(() => ItemsOrder, (ItemOrder) => ItemOrder.order, {
    onDelete: "CASCADE",
  })
  @Field(() => [ItemsOrder])
  itemsOrder: ItemsOrder[];
}
