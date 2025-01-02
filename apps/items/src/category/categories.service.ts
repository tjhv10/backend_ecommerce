import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./categories.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>
  ) {}
  async getCategories(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }
  async getCategoryById(id: number): Promise<Category> {
    const found = this.categoriesRepository.findOne({
      where: { id: id },
    });
    if (!found) {
      throw new NotFoundException(`Category does not exist with id "${id}"`);
    } else return found;
  }
}
