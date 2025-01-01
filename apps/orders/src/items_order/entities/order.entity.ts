import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Order {
  @Field(() => ID)
  id: number;

  @Field(() => Date)
  order_date: Date;
}
