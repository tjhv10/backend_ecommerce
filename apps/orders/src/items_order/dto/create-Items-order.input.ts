import { InputType, Field, ID, Int } from "@nestjs/graphql";
import { IsInt } from "class-validator";
import { PrimaryColumn } from "typeorm";
import { Order } from "../../orders/order.entity";
import { Items } from "../../../../items/src/item/items.entity";

@InputType()
export class CreateItems_orderInput {
  @Field(() => Order)
  order: Order;

  @PrimaryColumn()
  item_id: number;

  @PrimaryColumn()
  order_id: number;

  @Field(() => Items)
  item: Items;

  @IsInt()
  @Field(() => Int)
  amount: number;
}
