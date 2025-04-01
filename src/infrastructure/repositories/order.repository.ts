import { Op } from "sequelize";
import { Order } from "../../domain/entities/order";
import { OrderItem } from "../../domain/entities/order-item";
import type { IOrdersRepository } from "../../domain/repositories/orders.repository";
import { OrderItemModel } from "../db/sequelize/model/order-item.model";
import { OrderModel } from "../db/sequelize/model/order.model";

export class OrderRepository implements IOrdersRepository {
	async create(entity: Order): Promise<void> {
		await OrderModel.create(
			{
				id: entity.id,
				customer_id: entity.customerId,
				total: entity.total(),
				items: entity.items.map((item) => ({
					id: item.id,
					name: item.name,
					price: item.price,
					product_id: item.productId,
					quantity: item.quantity,
					order_id: entity.id,
				})),
			},
			{
				include: [
					{
						model: OrderItemModel,
					},
				],
			},
		);
	}

	async update(entity: Order): Promise<void> {
		const sequelize = OrderModel.sequelize;

		if (!sequelize) {
			throw new Error("Model not initialized.");
		}

		await sequelize.transaction(async (transaction) => {
			await OrderItemModel.destroy({
				where: { order_id: entity.id },
				transaction,
			});

			const items = entity.items.map((item) => ({
				id: item.id,
				name: item.name,
				price: item.price,
				product_id: item.productId,
				quantity: item.quantity,
				order_id: entity.id,
			}));

			await OrderItemModel.bulkCreate(items, {
				transaction,
			});

			await OrderModel.update(
				{
					customer_id: entity.customerId,
					total: entity.total(),
				},
				{
					where: {
						id: entity.id,
					},
					transaction,
				},
			);
		});
	}

	async findById(id: string): Promise<Order> {
		try {
			const orderModel = await OrderModel.findOne({
				where: {
					id,
				},
				include: ["items"],
				rejectOnEmpty: true,
			});

			const orderItems = orderModel.items.map(
				(item) =>
					new OrderItem(
						item.id,
						item.product_id,
						item.name,
						item.price,
						item.quantity,
					),
			);
			const order = new Order(id, orderModel.customer_id, orderItems);

			return order;
		} catch (error) {
			throw new Error("Order not found");
		}
	}

	async findAll(): Promise<Order[]> {
		const orderModels = await OrderModel.findAll({
			include: ["items"],
		});

		const orders = orderModels.map((orderModel) => {
			const orderItems = orderModel.items.map(
				(item) =>
					new OrderItem(
						item.id,
						item.product_id,
						item.name,
						item.price,
						item.quantity,
					),
			);
			const order = new Order(
				orderModel.id,
				orderModel.customer_id,
				orderItems,
			);

			return order;
		});

		return orders;
	}
}
