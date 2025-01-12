import { InputType, Field, Int } from "@nestjs/graphql";
import { IsInt } from "class-validator";

@InputType()
export class CreateItemsOrderInput {
  @Field(() => Int)
  itemId: number;

  @IsInt()
  @Field(() => Int)
  amount: number;
}
