import DataLoader from 'dataloader';
import { Category } from '../category/categories.entity';

export interface IDataloaders {
  itemCategoryLoader: DataLoader<number, Category[]>;
}
