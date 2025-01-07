import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";
import { ItemModule } from "./item/item.module";
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from "@nestjs/apollo";
import { CatergoyModule } from "./category/categories.module";
import { ItemCategoriesModule } from "./Item_Category/ItemCategory.module";
import { ConfigModule } from "@nestjs/config";
import { Item } from "./item/item.entity";
import { Category } from "./category/categories.entity";
import { ItemsCategories } from "./Item_Category/ItemCategory.entity";
import { DataloaderModule } from "./dataloader/dataloader.module";
import { DataloaderService } from "./dataloader/dataloader.service";

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
      entities: [Item, Category, ItemsCategories],
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
    ItemModule,
    CatergoyModule,
    ItemCategoriesModule,
    DataloaderModule,
  ],
})
export class AppModule {}
