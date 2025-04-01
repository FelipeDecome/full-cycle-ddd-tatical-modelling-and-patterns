import { OrderItem } from "./order-item";

export class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[];

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this.validate();
    }

    get id() {
        return this._id;
    }

    get customerId() {
        return this._customerId;
    }

    get items() {
        return this._items;
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }

        if (this._customerId.length === 0) {
            throw new Error("CustomerId is required");
        }

        if (this._items.length === 0) {
            throw new Error("At least 1 Item is required");
        }

        const isSomeItemsQuantityLessOrEqualZero = this._items.some(item => item.quantity <= 0)
        if (isSomeItemsQuantityLessOrEqualZero) {
            throw new Error("OrderItem quantity must be greater than 0")
        }
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.getTotal(), 0);
    }

    changeCustomer(customerId: string) {
        this._customerId = customerId;
    }

    changeItems(items: OrderItem[]) {
        this._items = items;
    }
}