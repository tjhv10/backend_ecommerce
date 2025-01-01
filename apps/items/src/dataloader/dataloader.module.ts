import { Module } from "@nestjs/common";
import { DataloaderService } from "./dataloader.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemCategoriesModule } from "../Item_Category/ItemCategory.module";

@Module({
  imports: [ItemCategoriesModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
