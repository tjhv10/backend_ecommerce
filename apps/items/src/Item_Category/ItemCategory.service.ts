import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ItemsCategories } from "./ItemCategory.entity";
import { CategoryService } from "../category/categories.service";
import { Category } from "../category/categories.entity";

@Injectable()
export class ItemsCategoriesService {
  constructor(
    @InjectRepository(ItemsCategories)
    private itemCategoryRepository: Repository<ItemsCategories>,
    private categoryService: CategoryService
  ) {}

  async getItemsCategories(): Promise<ItemsCategories[]> {
    return this.itemCategoryRepository.find();
  }

  async getItemsCategoriesByItemId(id: number): Promise<ItemsCategories[]> {
    const found = await this.itemCategoryRepository.find({
      where: { itemId: id },
    });
    if (!found || found.length === 0) {
      throw new NotFoundException(
        `Item with id "${id}" dosent have categories`
      );
    }

    return found;
  }

  public async getAllNamesByCategoryIds(
    categoryIds: readonly number[]
  ): Promise<Category[]> {
    return Promise.all(
      categoryIds.map(async (id) => {
        return await this.categoryService.getCategoryById(id);
      })
    );
  }

  public async getNamesOfCategoriesByBatch(
    categoryIds: readonly number[]
  ): Promise<Category[][]> {
    const batchCategories = await Promise.all(
      categoryIds.map((id) => this.getItemsCategoriesByItemId(id))
    );
    const names = await Promise.all(
      batchCategories.map(async (categories) => {
        const itemCategories = await Promise.all(
          categories.map(async (category) => {
            return this.categoryService.getCategoryById(category.categoryId);
          })
        );
        return itemCategories;
      })
    );
    return names;
  }
}
