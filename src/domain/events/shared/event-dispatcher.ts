import type { IDomainEvent } from "./domain-event.interface";
import type { IEventDispatcher } from "./event-dispatcher.interface";
import type { IEventHandler } from "./event-handler.interface";

export class EventDispatcher implements IEventDispatcher {
	private _eventHandlers: Map<string, IEventHandler[]> = new Map();

	get eventHandlers() {
		return this._eventHandlers;
	}

	public notify(event: IDomainEvent): void {
		const eventName = event.constructor.name;
		const eventHandlers = this._eventHandlers.get(eventName);

		if (!eventHandlers?.length) return;

		for (const handler of eventHandlers) {
			handler.handle(event);
		}
	}

	public register(eventName: string, handler: IEventHandler): void {
		const eventHandlers = this._eventHandlers.get(eventName) ?? [];
		const isHandlerRegistered = eventHandlers.find(
			(eventHandler) => eventHandler === handler,
		);

		if (!isHandlerRegistered) {
			eventHandlers.push(handler);
		}

		this._eventHandlers.set(eventName, eventHandlers);
	}

	public unregister(eventName: string, handler: IEventHandler): void {
		const eventHandlers = this._eventHandlers.get(eventName);

		if (!eventHandlers) return;

		const handlerIndex = eventHandlers.indexOf(handler);
		eventHandlers.splice(handlerIndex, 1);

		this._eventHandlers.set(eventName, eventHandlers);
	}

	public unregisterAll(): void {
		this._eventHandlers = new Map();
	}
}
