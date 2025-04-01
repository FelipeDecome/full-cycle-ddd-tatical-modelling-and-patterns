export class Address {
    private _street: string;
    private _number: number;
    private _zipcode: string
    private _city: string;

    constructor(street: string, number: number, zipcode: string, city: string) {
        this._street = street;
        this._number = number;
        this._zipcode = zipcode;
        this._city = city;
    }

    get street() {
        return this._street;
    }
    
    get number() {
        return this._number;
    }
    
    get zipcode() {
        return this._zipcode;
    }
    
    get city() {
        return this._city;
    }
}