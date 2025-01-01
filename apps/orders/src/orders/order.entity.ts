import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";

@ObjectType()
@Entity()
export class Orders {
  @Field(() => ID)
  @PrimaryColumn()
  id: number;

  @Field(() => Date)
  @Column()
  order_date: Date;
}
