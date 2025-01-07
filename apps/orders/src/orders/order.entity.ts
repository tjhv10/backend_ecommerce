import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ItemsOrder } from "../items_order/ItemOrder.entity";

@ObjectType()
@Entity()
@Directive('@key(fields: "id")')
@Directive("@shareable")
export class Orders {
  @Field(() => ID)
  @PrimaryColumn()
  id: number;

  @Field(() => Date)
  @Column()
  order_date: Date;

  @OneToMany(() => ItemsOrder, (itemsOrder) => itemsOrder.order_id)
  itemsOrder: ItemsOrder[];
}
