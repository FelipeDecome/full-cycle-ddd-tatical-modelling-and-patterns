export class OrderItem {
	_id: string;
	_productId: string;
	_name: string;
	_price: number;
	_quantity: number;

	constructor(
		id: string,
		productId: string,
		name: string,
		price: number,
		quantity: number,
	) {
		this._id = id;
		this._productId = productId;
		this._name = name;
		this._price = price;
		this._quantity = quantity;
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	get price() {
		return this._price;
	}

	get productId() {
		return this._productId;
	}

	get quantity() {
		return this._quantity;
	}

	getTotal() {
		return this._price * this._quantity;
	}
}
