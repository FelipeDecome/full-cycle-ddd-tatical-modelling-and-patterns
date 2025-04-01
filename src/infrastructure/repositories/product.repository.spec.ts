import { Sequelize } from "sequelize-typescript";
import { Product } from "../../domain/entities/product";
import { ProductModel } from "../db/sequelize/model/product.model";
import { ProductRepository } from "./product.repository";

let sequelize: Sequelize;

describe("Product repository unit tests", () => {
	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});

		sequelize.addModels([ProductModel]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it("Should be able to create a product", async () => {
		const productsRepository = new ProductRepository();
		const product = new Product("product-1", "Product 1", 100);

		await productsRepository.create(product);

		const findProduct = await ProductModel.findOne({
			where: {
				id: "product-1",
			},
		});

		expect(findProduct?.toJSON()).toStrictEqual({
			id: "product-1",
			name: "Product 1",
			price: 100,
		});
	});

	it("Should be able to update a product", async () => {
		const productsRepository = new ProductRepository();
		const product = new Product("product-1", "Product 1", 100);

		await productsRepository.create(product);

		product.changeName("Product 2");
		product.changePrice(500);

		await productsRepository.update(product);

		const findProduct = await ProductModel.findOne({
			where: {
				id: "product-1",
			},
		});

		expect(findProduct?.toJSON()).toStrictEqual({
			id: "product-1",
			name: "Product 2",
			price: 500,
		});
	});

	it("Should be able to find a product", async () => {
		const productsRepository = new ProductRepository();
		const product = new Product("product-1", "Product 1", 100);

		await productsRepository.create(product);

		const findProduct = await productsRepository.findById("product-1");

		expect(findProduct).toEqual(
			expect.objectContaining({
				id: "product-1",
				name: "Product 1",
				price: 100,
			}),
		);
	});

	it("Should be able to list all products", async () => {
		const productsRepository = new ProductRepository();
		const product1 = new Product("product-1", "Product 1", 100);
		const product2 = new Product("product-2", "Product 2", 100);
		const product3 = new Product("product-3", "Product 3", 100);

		await productsRepository.create(product1);
		await productsRepository.create(product2);
		await productsRepository.create(product3);

		const foundProducts = await productsRepository.findAll();
		const products = [product1, product2, product3];

		expect(foundProducts).toHaveLength(3);
		expect(products).toEqual(foundProducts);
	});
});
