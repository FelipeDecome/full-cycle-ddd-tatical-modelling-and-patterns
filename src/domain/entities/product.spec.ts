import { Product } from "./product";

describe("Product unit tests", () => {
	it("Should not be able to create an order with an empty id", () => {
		expect(() => {
			new Product("", "Product 1", 100);
		}).toThrow("Id is required");
	});

	it("Should not be able to create an order with an empty name", () => {
		expect(() => {
			new Product("product-1", "", 100);
		}).toThrow("Name is required");
	});

	it("Should not be able to create an order with a price less than/equals to 0", () => {
		expect(() => {
			new Product("product-1", "Product 1", -1);
		}).toThrow("Price must be greater than 0");
	});

	it("Should be able to change product's name", () => {
		const product = new Product("product-1", "Product 1", 100);
		product.changeName("Product 2");

		expect(product.name).toBe("Product 2");
	});

	it("Should not be able to change product's name to an empty value", () => {
		expect(() => {
			const product = new Product("product-1", "Product 1", 100);
			product.changeName("");
		}).toThrow("Name is required");
	});

	it("Should be able to change product's price", () => {
		const product = new Product("product-1", "Product 1", 100);
		product.changePrice(200);

		expect(product.price).toBe(200);
	});

	it("Should not be able to change product's price to a price less than/equals to 0", () => {
		expect(() => {
			const product = new Product("product-1", "Product 1", 100);
			product.changePrice(-1);
		}).toThrow("Price must be greater than 0");
	});
});
