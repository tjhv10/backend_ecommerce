import { Field, Int, ObjectType, Parent, ResolveField } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { IsInt } from "class-validator";
import { Orders } from "../../orders/entities/order.entity";
import { Item as Item } from "./items.entity";

@ObjectType()
@Entity()
export class ItemsOrder {
  // @ManyToOne(() => Order, (order: Order) => order.id, {
  //   onDelete: 'CASCADE',
  // })
  @IsInt()
  @PrimaryColumn()
  @Field(() => Int)
  id: number;

  @PrimaryColumn()
  item_id: number;

  @PrimaryColumn()
  order_id: number;

  @IsInt()
  @Field(() => Int)
  amount: number;

  @ResolveField(() => Item)
  getItem(@Parent() itemsOrder: ItemsOrder): any {
    return { __typename: "Items", id: itemsOrder.item_id };
  }
}
