import { SendEmailWhenProductIsCreatedHandler } from "../product/handler/send-email-when-product-is-created.handler";
import { ProductCreatedEvent } from "../product/product-created.event";
import { EventDispatcher } from "./event-dispatcher";

describe("Domain events tests", () => {
	it("Should be able to register an event handler", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();

		eventDispatcher.register("ProductCreatedEvent", eventHandler);

		const eventHandlers = eventDispatcher.eventHandlers.get(
			"ProductCreatedEvent",
		);

		expect(eventHandlers).toBeDefined();
		expect(eventHandlers).toHaveLength(1);
		expect(eventHandlers?.[0]).toMatchObject(eventHandler);
	});

	it("Should register an event handler once", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();

		eventDispatcher.register("ProductCreatedEvent", eventHandler);
		eventDispatcher.register("ProductCreatedEvent", eventHandler);

		const eventHandlers = eventDispatcher.eventHandlers.get(
			"ProductCreatedEvent",
		);

		expect(eventHandlers?.[0]).toMatchObject(eventHandler);
	});

	it("Should be able to unregister an event handler", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();

		eventDispatcher.register("ProductCreatedEvent", eventHandler);

		let eventHandlers = eventDispatcher.eventHandlers.get(
			"ProductCreatedEvent",
		);

		expect(eventHandlers?.[0]).toMatchObject(eventHandler);

		eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

		eventHandlers = eventDispatcher.eventHandlers.get("ProductCreatedEvent");

		expect(eventHandlers).toHaveLength(0);
	});

	it("Should be able to unregister all events", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler1 = new SendEmailWhenProductIsCreatedHandler();
		const eventHandler2 = new SendEmailWhenProductIsCreatedHandler();
		const eventHandler3 = new SendEmailWhenProductIsCreatedHandler();

		eventDispatcher.register("ProductCreatedEvent", eventHandler1);
		eventDispatcher.register("ProductCreatedEvent", eventHandler2);
		eventDispatcher.register("ProductCreatedEvent", eventHandler3);

		const eventHandlers = eventDispatcher.eventHandlers.get(
			"ProductCreatedEvent",
		);

		expect(eventHandlers?.[0]).toMatchObject(eventHandler1);
		expect(eventHandlers?.[1]).toMatchObject(eventHandler2);
		expect(eventHandlers?.[2]).toMatchObject(eventHandler3);

		eventDispatcher.unregisterAll();

		expect(eventDispatcher.eventHandlers).toEqual(new Map());
	});

	it("Should be able to notify all the handlers", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();

		const eventHandlerHandleSpy = jest.spyOn(eventHandler, "handle");

		eventDispatcher.register("ProductCreatedEvent", eventHandler);
		expect(
			eventDispatcher.eventHandlers.get("ProductCreatedEvent")?.[0],
		).toMatchObject(eventHandler);

		const productCreatedEvent = new ProductCreatedEvent({
			name: "Product 1",
			description: "Product 1 description",
			price: 10,
		});

		eventDispatcher.notify(productCreatedEvent);

		expect(eventHandlerHandleSpy).toHaveBeenCalled();
	});
});
