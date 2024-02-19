import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerChangeAddressEvent from "../customer-change-address.event";

export default class EnviaConsoleLogHandler
    implements EventHandlerInterface<CustomerChangeAddressEvent>
{
    handle(event: CustomerChangeAddressEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} aletardo para: ${event.eventData.address.street}, nro.${event.eventData.address.number}, ${event.eventData.address.city} - ${event.eventData.address.zip}`);
    }
}