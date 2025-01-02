// import { forwardRef, Module } from "@nestjs/common";
// import { TypeOrmModule } from "@nestjs/typeorm";
// import { Items } from "./items.entity";
// import { ItemService } from "./items.service";
// import { ItemCategoriesModule } from "../Item_Category/ItemCategory.module";
// import { DataloaderModule } from "../dataloader/dataloader.module";

// @Module({
//   imports: [
//     forwardRef(() => DataloaderModule),
//     TypeOrmModule.forFeature([Items]),
//     ItemCategoriesModule,
//   ],
//   providers: [ItemService],
// })
// export class ItemModule {}

import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Items } from "./items.entity";
import { ItemService } from "./items.service";
import { ItemCategoriesModule } from "../Item_Category/ItemCategory.module";
import { DataloaderModule } from "../dataloader/dataloader.module";

@Module({
  imports: [
    forwardRef(() => DataloaderModule),
    TypeOrmModule.forFeature([Items]),
    ItemCategoriesModule,
  ],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
