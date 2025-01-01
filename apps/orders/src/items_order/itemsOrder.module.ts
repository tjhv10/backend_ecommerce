import { Module } from "@nestjs/common";
import { ItemsOrderResolver } from "./itemsOrder.resolver";
import { ItemsOrderService } from "./itemsOrder.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemsOrder } from "./ItemOrder.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ItemsOrder])],
  providers: [ItemsOrderResolver, ItemsOrderService],
})
export class ItemsOrderModule {}
