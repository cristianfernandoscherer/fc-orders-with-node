import EventDispatcher from "./event-dispacher";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EnviaConsoleLog1Handler from "../customer/handler/envia-console-log1.handler";
import CustomerCreatedEvent from "../customer/customer-created.event";
import EnviaConsoleLog2Handler from "../customer/handler/envia-console-log2.handler";
import EnviaConsoleLogHandler from "../customer/handler/envia-console-log.handler";
import Customer from "../../entity/customer";
import CustomerChangeAddressEvent from "../customer/customer-change-address.event";


describe("Domain events tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
            1
        );
        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
            0
        );
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeUndefined();
    });

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0,
        });

        // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });

    it("should notify new customer", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
        ).toMatchObject(eventHandler2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "Cristian Fernando Scherer"
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });

    it("should notify the change of customer address", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]
        ).toMatchObject(eventHandler);

        const customerChangeAddressEvent = new CustomerChangeAddressEvent({
            id: "1234",
            name: "Cristian Fernando Scherer",
            address: {
                street: "Rua otto engelmann",
                number: 703,
                zip: 93950000,
                city: "Dois Irmãos"
            }
        });

        eventDispatcher.notify(customerChangeAddressEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });
});