import type { Customer } from "../entities/customer";
import type { RepositoryInterface } from "./repository.interface";

export interface ICustomersRepository extends RepositoryInterface<Customer> {}
