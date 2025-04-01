import { Product } from "../entities/product";
import { RepositoryInterface } from "./repository.interface";

export interface IProductsRepository extends RepositoryInterface<Product> {}