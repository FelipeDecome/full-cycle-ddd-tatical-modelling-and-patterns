import { Product } from "../../domain/entities/product";
import type { IProductsRepository } from "../../domain/repositories/products-repository.interface";
import { ProductModel } from "../db/sequelize/model/product.model";

export class ProductRepository implements IProductsRepository {
	public async create(entity: Product): Promise<void> {
		await ProductModel.create({
			id: entity.id,
			name: entity.name,
			price: entity.price,
		});
	}

	public async update(entity: Product): Promise<void> {
		await ProductModel.update(
			{
				name: entity.name,
				price: entity.price,
			},
			{
				where: {
					id: entity.id,
				},
			},
		);
	}

	public async findById(id: string): Promise<Product | null> {
		const entity = await ProductModel.findOne({
			where: {
				id,
			},
		});

		if (!entity) return null;

		return new Product(entity.id, entity.name, entity.price);
	}

	public async findAll(): Promise<Product[]> {
		const entities = await ProductModel.findAll();

		return entities.map(
			(entity) => new Product(entity.id, entity.name, entity.price),
		);
	}
}
