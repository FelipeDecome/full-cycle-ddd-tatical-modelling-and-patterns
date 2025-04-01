import { Customer } from "../entities/customer";
import { RepositoryInterface } from "./repository.interface";

export interface ICustomersRepository extends RepositoryInterface<Customer> {}