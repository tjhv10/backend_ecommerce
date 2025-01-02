import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { IsInt } from "class-validator";
import { Items } from "apps/items/src/item/items.entity";

@ObjectType()
@Entity()
export class ItemsOrder {
  // @ManyToOne(() => Order, (order: Order) => order.id, {
  //   onDelete: 'CASCADE',
  // })
  @IsInt()
  @PrimaryColumn()
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @IsInt()
  @Field(() => Int)
  @Column()
  item_id: number;

  @IsInt()
  @Field(() => Int)
  @Column()
  order_id: number;

  @IsInt()
  @Field(() => Int)
  @Column()
  amount: number;

  @Field(() => Items)
  item: Items;
}
