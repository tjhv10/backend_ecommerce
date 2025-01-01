import { InputType, Field, ID } from "@nestjs/graphql";
import { Items } from "../entities/items.entity";

@InputType()
export class CreatePostInput {
  @Field(() => ID)
  id: number;

  @Field(() => Date)
  order_date: Date;

  @Field(() => [Items])
  items: Items[];

  @Field(() => [Number])
  amounts: Number[];
}
