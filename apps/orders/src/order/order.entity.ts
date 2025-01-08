import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ItemsOrder } from "../items_order/ItemOrder.entity";

@ObjectType()
@Entity({ name: "orders" })
@Directive("@shareable")
export class Order {
  @Field(() => ID)
  @PrimaryColumn()
  id: number;

  @Field(() => Date)
  @Column()
  order_date: Date;

  @OneToMany(() => ItemsOrder, (ItemOrder) => ItemOrder.order)
  @Field(() => [ItemsOrder])
  itemsOrder: ItemsOrder[];
}
