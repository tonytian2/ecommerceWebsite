import Order from './Order.js';

const OrderFeed = ({ orders }) => {
    return (
        <>
            {orders.map(order => (
                <Order key={order.orderId} order={order} />
            ))}
        </>
    )
}

export default OrderFeed