import { Address } from "./address";

export class Customer {
    private _id: string;
    private _name: string;
    private _address?: Address;
    private _rewardPoints: number = 0;
    private _active: boolean = false;

    constructor(id: string, name: string, address?: Address) {
        this._id = id;
        this._name = name;
        this._address = address;
        this.validate();
    }

    get id() {
        return this._id;
    }
    
    get name() {
        return this._name;
    }

    get address() {
        return this._address;
    }

    get rewardPoints() {
        return this._rewardPoints;
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }

        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    awardPoints(points: number) {
        this._rewardPoints = this._rewardPoints + points;
    }

    activate() {
        if (!this._address) {
            throw new Error("Address is required to activate Customer")
        }

        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    get isActive() {
        return this._active;
    }
}