import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from "@nestjs/apollo";
import { ConfigModule } from "@nestjs/config";
import { DataloaderModule } from "./dataloader/dataloader.module";
import { DataloaderService } from "./dataloader/dataloader.service";
import { OrderModule } from "./orders/order.module";
import { ItemModule } from "apps/items/src/item/items.module";
import { ItemsOrderModule } from "./items_order/itemsOrder.module";
import { ItemsOrder } from "./items_order/ItemOrder.entity";
import { Order } from "./orders/order.entity";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "02082003",
      database: "Items",
      autoLoadEntities: true,
      synchronize: false,
      entities: [Order, ItemsOrder],
    }),
    GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      imports: [DataloaderModule],
      useFactory: (dataloaderService: DataloaderService) => {
        return {
          autoSchemaFile: {
            federation: 2,
          },
          context: () => ({
            loaders: dataloaderService.getLoaders(),
          }),
        };
      },
      inject: [DataloaderService],
    }),
    OrderModule,
    ItemsOrderModule,
  ],
})
export class AppModule {}
