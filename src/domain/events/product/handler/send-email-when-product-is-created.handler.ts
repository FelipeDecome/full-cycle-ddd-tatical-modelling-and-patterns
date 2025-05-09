import type { IEventHandler } from "../../shared/event-handler.interface";
import type { ProductCreatedEvent } from "../product-created.event";

export class SendEmailWhenProductIsCreatedHandler
	implements IEventHandler<ProductCreatedEvent>
{
	handle(event: ProductCreatedEvent): void {
		console.log("Sending email to ....");
	}
}
