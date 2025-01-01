import { Field, Int, ObjectType, Parent, ResolveField } from "@nestjs/graphql";
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

  // @ResolveField(() => Items)
  // getItem(@Parent() itemsOrder: ItemsOrder): any {
  //   return { __typename: "Items", id: itemsOrder.item_id };
  // }
}
