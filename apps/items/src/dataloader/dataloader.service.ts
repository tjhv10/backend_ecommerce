import { Injectable } from "@nestjs/common";
import * as DataLoader from "dataloader";
import { IDataloaders } from "./dataloader.interface";
import { Category } from "../category/categories.entity";
import { ItemsCategoriesService } from "../Item_Category/Item-category.service";

@Injectable()
export class DataloaderService {
  constructor(
    private readonly itemsCategoriesService: ItemsCategoriesService
  ) {}

  getLoaders(): IDataloaders {
    const itemCategoryLoader = this._generateCategoryNamesLoader();
    return {
      itemCategoryLoader,
    };
  }

  private _generateCategoryNamesLoader() {
    return new DataLoader<number, Category[]>(
      async (keys: readonly number[]) => {
        const categories =
          await this.itemsCategoriesService.getNamesOfCategoriesByBatch(
            keys as number[]
          );
        return categories.map((categoryArray) =>
          categoryArray.map((category) => category)
        );
      }
    );
  }
}
