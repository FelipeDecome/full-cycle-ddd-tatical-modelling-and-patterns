import type { IDomainEvent } from "./domain-event.interface";

export interface IEventHandler<T extends IDomainEvent = IDomainEvent> {
	handle(event: T): void;
}
