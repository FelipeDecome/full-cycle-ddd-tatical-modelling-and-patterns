import { Order } from "../entities/order";
import { RepositoryInterface } from "./repository.interface";

export interface IOrdersRepository extends RepositoryInterface<Order> {}