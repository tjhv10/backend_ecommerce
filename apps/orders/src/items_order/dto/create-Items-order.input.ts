import { InputType, Field, Int } from "@nestjs/graphql";
import { IsInt } from "class-validator";
import { PrimaryColumn } from "typeorm";

@InputType()
export class CreateItemsOrderInput {
  @PrimaryColumn()
  @Field(() => Int)
  id: number;

  @PrimaryColumn()
  @Field(() => Int)
  // change name
  item_id: number;

  @PrimaryColumn()
  @Field(() => Int)
  order_id: number;

  @IsInt()
  @Field(() => Int)
  amount: number;
}
