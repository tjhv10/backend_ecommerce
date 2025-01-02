import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./categories.entity";
import { CategoryService } from "./categories.service";
import { CategoriesResolver } from "./category.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService, CategoriesResolver],
  exports: [CategoryService],
})
export class CatergoyModule {}
