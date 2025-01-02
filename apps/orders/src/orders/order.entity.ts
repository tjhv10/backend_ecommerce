import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { ItemsOrder } from "../items_order/ItemOrder.entity";

@ObjectType()
@Entity()
export class Orders {
  @Field(() => ID)
  @PrimaryColumn()
  id: number;

  @Field(() => Date)
  @Column()
  order_date: Date;

  @Field(() => [ItemsOrder])
  Items: ItemsOrder[];
}
