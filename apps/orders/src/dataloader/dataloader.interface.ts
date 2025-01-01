import DataLoader from 'dataloader';
import { Category } from '../orders/entities/categories.entity';

export interface IDataloaders {
  itemCategoryLoader: DataLoader<number, Category[]>;
}
