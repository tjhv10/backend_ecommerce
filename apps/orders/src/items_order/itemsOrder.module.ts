import { forwardRef, Module } from "@nestjs/common";
import { ItemsOrderService } from "./itemsOrder.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemsOrder } from "./ItemOrder.entity";
import { Items } from "apps/items/src/item/items.entity";
import { HttpModule } from "@nestjs/axios";
import { Orders } from "../orders/order.entity";
import { OrderModule } from "../orders/order.module";
import { ItemModule } from "apps/items/src/item/items.module";

@Module({
  imports: [
    forwardRef(() => ItemModule),
    TypeOrmModule.forFeature([ItemsOrder, Items, Orders]),
    HttpModule,
    OrderModule,
  ],
  providers: [ItemsOrderService],
  exports: [ItemsOrderService],
})
export class ItemsOrderModule {}
