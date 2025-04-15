import type { IDomainEvent } from "../shared/domain-event.interface";

export class ProductCreatedEvent implements IDomainEvent {
	public dateTimeOcurred: Date;

	constructor(public eventData: unknown) {
		this.dateTimeOcurred = new Date();
	}
}
