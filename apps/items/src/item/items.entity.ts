import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from "typeorm";
import { Directive, Field, Int, ObjectType } from "@nestjs/graphql";
import { ItemStatus } from "../../../../packages/enum/items-status.enum";
import { IsInt } from "class-validator";
import { Category } from "../category/categories.entity";

@ObjectType()
@Entity()
@Directive("@shareable")
export class Items {
  @IsInt()
  @PrimaryColumn()
  @Field(() => Int)
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Date)
  @Column()
  upload_date: Date;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => Int)
  @Column()
  price: number;

  @Field(() => String)
  @Column()
  seller_name: string;

  @Field(() => String)
  @Column()
  image_url: string;

  @Field()
  @Column()
  status: ItemStatus;

  @Field(() => [Category])
  categories: Category[];
}
