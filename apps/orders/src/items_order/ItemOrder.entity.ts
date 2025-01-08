import { Directive, Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsInt } from "class-validator";
import { Item } from "apps/items/src/items/item.entity";
import { Order } from "../order/order.entity";

@ObjectType()
@Entity({ name: "items_order" })
@Directive("@shareable")
export class ItemsOrder {
  @IsInt()
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @IsInt()
  @Field(() => Int)
  @Column({ name: "itemId" })
  itemId: number;

  @IsInt()
  @Field(() => Int)
  @Column({ name: "orderId" })
  orderId: number;

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
