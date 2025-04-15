import type { IDomainEvent } from "./domain-event.interface";
import type { IEventHandler } from "./event-handler.interface";

export interface IEventDispatcher {
	notify(event: IDomainEvent): void;
	register(eventName: string, handler: IEventHandler): void;
	unregister(eventName: string, handler: IEventHandler): void;
	unregisterAll(): void;
}
