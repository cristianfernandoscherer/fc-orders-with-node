import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

let customer = new Customer("123", "Cristian F. Scherer");
const address = new Address("Rua dois", 2, "12345-678", "São Paulo");
customer.Address = address;
customer.activate();


const item1 = new OrderItem("1", "Item 1", 10, 1);
const item2 = new OrderItem("2", "Item 2", 9, 2);
const item3 = new OrderItem("3", "Item 3", 8, 3);

const order = new Order("1", "123", [item1, item2, item3]);