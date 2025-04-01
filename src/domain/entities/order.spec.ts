import { Order } from "./order";
import { OrderItem } from "./order-item"

describe("Order unit tests", () => {
    it("Should not be able to create an order with an empty id", () => {
        expect(() => {
            const item1 = new OrderItem("item-1", "product-1", "Item 1", 100, 10);
            new Order("", "customer-1", [item1]);
        }).toThrow("Id is required")
    })
    
    it("Should not be able to create an order with an empty customer id", () => {
        expect(() => {
            const item1 = new OrderItem("item-1", "product-1","Item 1", 100, 10);
            new Order("order-1", "", [item1]);
        }).toThrow("CustomerId is required")
    })

    it("Should not be able to create an order with no items", () => {
        expect(() => {
            new Order("order-1", "customer-1", []);
        }).toThrow("At least 1 Item is required")
    })

    it("Should be able to calculate total", () => {
        const item1 = new OrderItem("item-1", "product-1", "Item 1", 100, 10);
        const item2 = new OrderItem("item-2", "product-1", "Item 2", 100, 10);
        const item3 = new OrderItem("item-3", "product-1", "Item 3", 100, 10);
        const order = new Order("order-1", "customer-1", [item1, item2, item3]);

        const total = order.total();

        expect(total).toBe(3000)
    })

    it("Should not be able to create an order with an Item's quantity less than/equals to 0", () => {
        expect(() => {
            const item1 = new OrderItem("item-1", "product-1", "Item 1", 100, 0);
            new Order("order-1", "customer-1", [item1]);
        }).toThrow("OrderItem quantity must be greater than 0")
    })
})