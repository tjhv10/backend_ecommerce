import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from "@nestjs/apollo";
import { ConfigModule } from "@nestjs/config";
import { OrderModule } from "./orders/order.module";
import { ItemsOrderModule } from "./items_order/itemsOrder.module";
import { ItemsOrder } from "./items_order/ItemOrder.entity";
import { Orders } from "./orders/order.entity";
import { DataloaderModule } from "../dataloader/dataloader.module";
import { DataloaderService } from "../dataloader/dataloader.service";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.HOST,
      port: parseInt(process.env.PORT),
      username: "postgres",
      // username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      autoLoadEntities: true,
      entities: [ItemsOrder, Orders],
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
    DataloaderModule,
    OrderModule,
    ItemsOrderModule,
  ],
})
export class AppModule {}
