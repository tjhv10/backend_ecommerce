import { Directive, Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { IsInt } from "class-validator";
import { Items } from "apps/items/src/item/items.entity";
import { Orders } from "../orders/order.entity";

@ObjectType()
@Entity()
@Directive('@key(fields: "id")')
@Directive("@shareable")
export class ItemsOrder {
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

  @ManyToOne(() => Orders, (order: Orders) => order.id, {
    onDelete: "CASCADE",
  })
  order: Orders;
}
