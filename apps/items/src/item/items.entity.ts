import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from "typeorm";
import { Directive, Field, Int, ObjectType } from "@nestjs/graphql";
import { ItemStatus } from "../../../../packages/enum/items-status.enum";
// import { ItemStatus } from '../../../item_status';
import { IsInt } from "class-validator";
import { Category } from "../category/categories.entity";

@ObjectType()
@Entity()
@Directive('@key(fields: "id")')
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

  @Field(() => String)
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

  @ManyToMany(() => Category)
  @JoinTable({
    name: "items_categories",
    joinColumn: { name: "itemId" },
    inverseJoinColumn: { name: "categoryId" },
  })
  @Field(() => [Category])
  categories: Category[];
}
