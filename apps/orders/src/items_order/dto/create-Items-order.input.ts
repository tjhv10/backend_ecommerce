import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { Order } from '../entities/order.entity';
import { PrimaryColumn } from 'typeorm';
import { Item } from '../entities/items.entity';

@InputType()
export class CreateItems_orderInput {
  @Field(() => Order)
  order: Order;

  @PrimaryColumn()
  item_id: number;

  @PrimaryColumn()
  order_id: number;

  @Field(() => Item)
  item: Item;

  @IsInt()
  @Field(() => Int)
  amount: number;
}
