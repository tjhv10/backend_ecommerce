import { InputType, Field, ID, Int } from "@nestjs/graphql";
import { IsInt } from "class-validator";
import { PrimaryColumn } from "typeorm";
import { Orders } from "../../orders/order.entity";
import { Items } from "../../../../items/src/item/items.entity";

@InputType()
export class CreateItems_orderInput {
  @IsInt()
  @PrimaryColumn()
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @PrimaryColumn()
  item_id: number;

  @PrimaryColumn()
  order_id: number;

  @IsInt()
  @Field(() => Int)
  amount: number;
}
