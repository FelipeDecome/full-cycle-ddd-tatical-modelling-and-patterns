import { Address } from "./address";
import { Customer } from "./customer"

describe("Customer unit tests", () => {
    it("Should not be able to create a customer with an empty id", () => {
        expect(() => {
            new Customer("", "John Doe");
        }).toThrow("Id is required")
    })

    it("Should not be able to create a customer with an empty name", () => {
        expect(() => {
            new Customer("12345", "");
        }).toThrow("Name is required")
    })

    it("Should be able to change customer's name", () => {
        const customer = new Customer("12345", "John Doe");
        customer.changeName("Jane Doe");

        expect(customer.name).toBe("Jane Doe")
    })

    it("Should not be able to change customer's name to an empty value", () => {
        expect(() => {
            const customer = new Customer("12345", "John Doe");
            customer.changeName("");
        }).toThrow("Name is required")
    })

    it("Should be able to activate customer", () => {
        const customer = new Customer("12345", "John Doe", new Address("street", 123, "state", "12345-678"));
        customer.activate();

        expect(customer.isActive).toBe(true);
    })

    it("Should not be able to activate customer with empty address", () => {
        const customer = new Customer("12345", "John Doe");

        expect(() => {
            customer.activate();
        }).toThrow("Address is required to activate Customer");
    })

    it("Should be able to deactivate customer", () => {
        const customer = new Customer("12345", "John Doe", new Address("street", 123, "state", "12345-678"));
        
        customer.activate();
        customer.deactivate();

        expect(customer.isActive).toBe(false);
    })

    it("Should be able to award points", () => {
        const customer = new Customer("12345", "John Doe", new Address("street", 123, "state", "12345-678"));
        
        expect(customer.rewardPoints).toBe(0);

        customer.awardPoints(100);
        expect(customer.rewardPoints).toBe(100);

        customer.awardPoints(200);
        expect(customer.rewardPoints).toBe(300);
    })
})