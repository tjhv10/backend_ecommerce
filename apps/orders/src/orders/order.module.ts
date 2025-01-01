import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderResolver } from "./order.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Orders } from "./order.entity";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [TypeOrmModule.forFeature([Orders]), HttpModule],
  providers: [OrderService, OrderResolver],
  exports: [OrderService],
})
export class OrderModule {}
