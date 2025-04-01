import { Product } from "../entities/product";

export class ProductService {
    static increasePrice(products: Product[], percentage: number) {
        for (const product of products) {
            const increaseValue = product.price * (percentage / 100);
            product.changePrice(product.price + increaseValue)
        }
    }
}