import { Product } from "../entities/product"
import { ProductService } from "./product.service";

describe("Orde Service unit tests", () => {
    it("Should change the prices of all products", () => {
        const product1 = new Product("product-1", "Product 1", 100);
        const product2 = new Product("product-2", "Product 2", 200);

        const products = [product1, product2];
        
        ProductService.increasePrice(products, 100);

        expect(product1.price).toBe(200);
        expect(product2.price).toBe(400);
    })
})