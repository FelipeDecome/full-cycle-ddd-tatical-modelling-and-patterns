import type { Order } from "../entities/order";
import type { RepositoryInterface } from "./repository.interface";

export interface IOrdersRepository extends RepositoryInterface<Order> {}
