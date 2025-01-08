import { InputType, Field, Int } from "@nestjs/graphql";
import { IsInt } from "class-validator";

@InputType()
export class UpdateAmountInput {
  @Field(() => Int)
  @IsInt()
  orderId: number;

  @Field(() => Int)
  @IsInt()
  itemId: number;

  @Field(() => Int)
  @IsInt()
  amount: number;
}
