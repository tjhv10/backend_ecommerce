import { Directive, Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { IsInt } from "class-validator";
import { Item } from "apps/items/src/item/item.entity";
import { Order } from "../orders/order.entity";

@ObjectType()
@Entity({ name: "items_order" })
@Directive("@shareable")
export class ItemsOrder {
  @IsInt()
  @PrimaryColumn()
  @Field(() => Int)
  id: number;

  @IsInt()
  @Field(() => Int)
  @Column()
  item_id: number;

  @IsInt()
  @Field(() => Int)
  @Column()
  order_id: number;

  @IsInt()
  @Field(() => Int)
  @Column()
  amount: number;

  @Field(() => Item)
  item: Item;

  @ManyToOne(() => Order, (order: Order) => order.itemsOrder, {
    onDelete: "CASCADE",
  })
  @Field(() => Order)
  order: Order;
}
