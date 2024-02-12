import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order.repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        try {
            await OrderModel.create(
                {
                    id: entity.id,
                    customer_id: entity.customerId,
                    total: entity.total(),
                    items: entity.items.map((item) => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        product_id: item.productId,
                        quantity: item.quantity,
                    })),
                },
                {
                    include: [{ model: OrderItemModel }]
                }
            );
        } catch (error) {
            throw new Error("Order not created: " + error);
        }
    }

    async find(id: string): Promise<Order> {
        let orderModel;
        try {
            orderModel = await OrderModel.findOne({
                where: {
                    id,
                },
                rejectOnEmpty: true,
                include: ["items"]
            });
        } catch (error) {
            throw new Error("Order not found");
        }

        let orderItems = orderModel.items.map((orderModel) =>
            new OrderItem(orderModel.id, orderModel.name, orderModel.price, orderModel.quantity, orderModel.product_id)
        );

        let order = new Order(
            orderModel.id,
            orderModel.customer_id,
            orderItems
        );

        return order;
    }

    async findAll(): Promise<Order[]> {
        let ordersModel;
        try {
            ordersModel = await OrderModel.findAll({
                include: ["items"]
            });
        } catch (error) {
            throw new Error("Orders not found");
        }

        return ordersModel.map((orderModel) => {

            let orderItems = orderModel.items.map((item) => {
                return new OrderItem(
                    item.id,
                    item.name,
                    item.price,
                    item.quantity,
                    item.product_id
                );
            });

            return new Order(
                orderModel.id,
                orderModel.customer_id,
                orderItems
            );
        });
    }

    async update(): Promise<void> {
        console.log("It's not used in this project.");
    }
}