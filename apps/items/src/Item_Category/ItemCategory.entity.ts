import { Directive, Field, Int, ObjectType } from "@nestjs/graphql";
import { Items } from "../item/items.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { IsInt } from "class-validator";
import { Category } from "../category/categories.entity";

@ObjectType("itemsCategories")
@Entity("items_categories")
@Directive("@shareable")
export class ItemsCategories {
  @ManyToOne(() => Category, (category: Category) => category.id, {
    onDelete: "CASCADE",
  })
  @IsInt()
  @Field(() => Category)
  category: Category;

  @PrimaryColumn()
  itemId: number;

  @PrimaryColumn()
  categoryId: number;

  @ManyToOne(() => Items, (item: Items) => item.id, { onDelete: "CASCADE" })
  @IsInt()
  @Field(() => Items)
  item: Items;
}
