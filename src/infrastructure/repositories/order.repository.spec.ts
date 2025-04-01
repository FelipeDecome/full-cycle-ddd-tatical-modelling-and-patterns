import { Sequelize } from "sequelize-typescript";

import { Address } from "../../domain/entities/address";
import { Customer } from "../../domain/entities/customer";
import { Order } from "../../domain/entities/order";
import { OrderItem } from "../../domain/entities/order-item";
import { Product } from "../../domain/entities/product";
import { CustomerModel } from "../db/sequelize/model/customer.model";
import { OrderItemModel } from "../db/sequelize/model/order-item.model";
import { OrderModel } from "../db/sequelize/model/order.model";
import { ProductModel } from "../db/sequelize/model/product.model";
import { CustomerRepository } from "./customer.repository";
import { OrderRepository } from "./order.repository";
import { ProductRepository } from "./product.repository";

describe("Order repository test", () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});

		sequelize.addModels([
			CustomerModel,
			OrderModel,
			OrderItemModel,
			ProductModel,
		]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it("Should be able to create an order", async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer("customer-1", "Customer 1");
		const address = new Address("street 1", 123, "12345-654", "sp");
		customer.changeAddress(address);
		await customerRepository.create(customer);

		const productRepository = new ProductRepository();
		const product = new Product("product-1", "Product 1", 10);
		await productRepository.create(product);

		const orderItem = new OrderItem(
			"order-item-1",
			product.id,
			product.name,
			product.price,
			10,
		);

		const orderRepository = new OrderRepository();
		const order = new Order("order-1", customer.id, [orderItem]);
		await orderRepository.create(order);

		const orderModel = await OrderModel.findOne({
			where: { id: order.id },
			include: ["items"],
		});

		expect(orderModel?.toJSON()).toStrictEqual({
			id: "order-1",
			customer_id: "customer-1",
			total: order.total(),
			items: [
				{
					id: orderItem.id,
					name: orderItem.name,
					price: orderItem.price,
					quantity: orderItem.quantity,
					product_id: "product-1",
					order_id: "order-1",
				},
			],
		});
	});

	it("Should be able to update an order", async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer("customer-1", "Customer 1");
		const address = new Address("street 1", 123, "12345-654", "sp");
		customer.changeAddress(address);
		await customerRepository.create(customer);

		const productRepository = new ProductRepository();
		const product = new Product("product-1", "Product 1", 10);
		await productRepository.create(product);

		const orderItem = new OrderItem(
			"order-item-1",
			product.id,
			product.name,
			product.price,
			10,
		);

		const orderRepository = new OrderRepository();
		const order = new Order("order-1", customer.id, [orderItem]);
		await orderRepository.create(order);

		const orderModel = await OrderModel.findOne({
			where: { id: order.id },
			include: ["items"],
		});

		expect(orderModel?.toJSON()).toStrictEqual({
			id: "order-1",
			customer_id: "customer-1",
			total: order.total(),
			items: [
				{
					id: orderItem.id,
					name: orderItem.name,
					price: orderItem.price,
					quantity: orderItem.quantity,
					product_id: "product-1",
					order_id: "order-1",
				},
			],
		});

		const customer2 = new Customer("customer-2", "Customer 2");
		customer2.changeAddress(address);
		await customerRepository.create(customer2);

		order.changeCustomer(customer2.id);

		const product2 = new Product("product-2", "Product 2", 20);
		await productRepository.create(product2);

		const orderItem2 = new OrderItem(
			"order-item-2",
			product2.id,
			product2.name,
			product2.price,
			5,
		);

		order.changeItems([orderItem, orderItem2]);
		await orderRepository.update(order);

		const orderModel2 = await OrderModel.findOne({
			where: { id: order.id },
			include: ["items"],
		});

		expect(orderModel2?.toJSON()).toStrictEqual({
			id: "order-1",
			customer_id: "customer-2",
			total: order.total(),
			items: [
				{
					id: orderItem.id,
					name: orderItem.name,
					price: orderItem.price,
					quantity: orderItem.quantity,
					product_id: "product-1",
					order_id: "order-1",
				},
				{
					id: orderItem2.id,
					name: orderItem2.name,
					price: orderItem2.price,
					quantity: orderItem2.quantity,
					product_id: "product-2",
					order_id: "order-1",
				},
			],
		});
	});

	it("Should be able to find an order by id", async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer("customer-1", "Customer 1");
		const address = new Address("street 1", 123, "12345-654", "sp");
		customer.changeAddress(address);
		await customerRepository.create(customer);

		const productRepository = new ProductRepository();
		const product = new Product("product-1", "Product 1", 10);
		await productRepository.create(product);

		const orderItem = new OrderItem(
			"order-item-1",
			product.id,
			product.name,
			product.price,
			10,
		);

		const orderRepository = new OrderRepository();
		const order = new Order("order-1", customer.id, [orderItem]);
		await orderRepository.create(order);

		const orderResult = await orderRepository.findById("order-1");

		expect(order).toStrictEqual(orderResult);
	});

	it("Should throw an error when order is not found", async () => {
		const orderRepository = new OrderRepository();

		expect(async () => {
			await orderRepository.findById("456ABC");
		}).rejects.toThrow("Order not found");
	});

	it("Should be able to find all orders", async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer("customer-1", "Customer 1");
		const address = new Address("street 1", 123, "12345-654", "sp");
		customer.changeAddress(address);
		await customerRepository.create(customer);

		const productRepository = new ProductRepository();
		const product = new Product("product-1", "Product 1", 10);
		await productRepository.create(product);

		const orderItem = new OrderItem(
			"order-item-1",
			product.id,
			product.name,
			product.price,
			10,
		);

		const orderRepository = new OrderRepository();
		const order = new Order("order-1", customer.id, [orderItem]);
		await orderRepository.create(order);

		const customer2 = new Customer("customer-2", "Customer 2");
		customer2.changeAddress(address);
		await customerRepository.create(customer2);

		const product2 = new Product("product-2", "Product 2", 10);
		await productRepository.create(product2);

		const orderItem2 = new OrderItem(
			"order-item-2",
			product2.id,
			product2.name,
			product2.price,
			10,
		);

		const order2 = new Order("order-2", customer2.id, [orderItem2]);
		await orderRepository.create(order2);

		const orders = await orderRepository.findAll();

		expect(orders).toHaveLength(2);
		expect(orders).toContainEqual(order);
		expect(orders).toContainEqual(order2);
	});
});
