import { randomUUID } from "node:crypto";

import type { Customer } from "../entities/customer";
import { Order } from "../entities/order";
import type { OrderItem } from "../entities/order-item";

export class OrderService {
	static getAllOrdersTotal(orders: Order[]): number {
		return orders.reduce((acc, order) => acc + order.total(), 0);
	}

	static placeOrder(customer: Customer, items: OrderItem[]): Order {
		if (items.length === 0) {
			throw new Error("Items must have at least 1 item");
		}

		const order = new Order(randomUUID(), customer.id, items);
		const total = order.total();

		customer.awardPoints(Math.floor(total / 2));

		return order;
	}
}
