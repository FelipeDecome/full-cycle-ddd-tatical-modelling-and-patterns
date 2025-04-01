import { Customer } from "../entities/customer";
import { Order } from "../entities/order";
import { OrderItem } from "../entities/order-item";
import { OrderService } from "./order.service";

describe("Order Service unit tests", () => {
    it("Should be able to place an order", () => {
        const customer = new Customer("customer-1", "Customer 1");
        const item1 = new OrderItem("item-1", "product-1", "Item 1", 100, 10);

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(500);
        expect(order.total()).toBe(1000);
    })

    it("Should not be able to place an order with no items", () => {
        const customer = new Customer("customer-1", "Customer 1");

        expect(() => {
            OrderService.placeOrder(customer, [])
        }).toThrow("Items must have at least 1 item")
    })

    it("Should be able to calculate all orders total", () => {
        const items1 = [
            new OrderItem("item-1", "product-1", "Item 1", 100, 10),
            new OrderItem("item-2", "product-2", "Item 2", 200, 10),
        ];
        const items2 = [
            new OrderItem("item-3", "product-3", "Item 3", 300, 10),
            new OrderItem("item-4", "product-4", "Item 4", 400, 10),
        ];

        const orders = [
            new Order("order-1", "customer-1", items1),
            new Order("order-2", "customer-2", items2),
        ];

        const allOrdersTotal = OrderService.getAllOrdersTotal(orders);

        expect(allOrdersTotal).toBe(10000);
    })
})