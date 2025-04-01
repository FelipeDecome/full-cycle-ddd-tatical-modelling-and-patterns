import { Address } from "../../domain/entities/address";
import { Customer } from "../../domain/entities/customer";
import type { ICustomersRepository } from "../../domain/repositories/customers-repository.interface";
import { CustomerModel } from "../db/sequelize/model/customer.model";

export class CustomerRepository implements ICustomersRepository {
	async create(entity: Customer): Promise<void> {
		await CustomerModel.create({
			id: entity.id,
			name: entity.name,
			street: entity.address?.street,
			number: entity.address?.number,
			zipcode: entity.address?.zipcode,
			city: entity.address?.city,
			active: entity.isActive,
			rewardPoints: entity.rewardPoints,
		});
	}

	async update(entity: Customer): Promise<void> {
		await CustomerModel.update(
			{
				name: entity.name,
				street: entity.address?.street,
				number: entity.address?.number,
				zipcode: entity.address?.zipcode,
				city: entity.address?.city,
				active: entity.isActive,
				rewardPoints: entity.rewardPoints,
			},
			{
				where: {
					id: entity.id,
				},
			},
		);
	}

	async findById(id: string): Promise<Customer> {
		try {
			const customerModel = await CustomerModel.findOne({
				where: {
					id,
				},
				rejectOnEmpty: true,
			});

			const customer = new Customer(id, customerModel.name);

			const address = new Address(
				customerModel.street,
				customerModel.number,
				customerModel.zipcode,
				customerModel.city,
			);

			customer.changeAddress(address);

			return customer;
		} catch (error) {
			throw new Error("Customer not found");
		}
	}

	async findAll(): Promise<Customer[]> {
		const customerModels = await CustomerModel.findAll();

		const customers = customerModels.map((customerModels) => {
			const customer = new Customer(customerModels.id, customerModels.name);
			customer.awardPoints(customerModels.rewardPoints);
			const address = new Address(
				customerModels.street,
				customerModels.number,
				customerModels.zipcode,
				customerModels.city,
			);
			customer.changeAddress(address);
			if (customerModels.active) {
				customer.activate();
			}
			return customer;
		});

		return customers;
	}
}
