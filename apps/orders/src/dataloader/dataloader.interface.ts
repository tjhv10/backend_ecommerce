import { Category } from "apps/items/src/category/categories.entity";
import DataLoader from "dataloader";

export interface IDataloaders {
  itemCategoryLoader: DataLoader<number, Category[]>;
}
