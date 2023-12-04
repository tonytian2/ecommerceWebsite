import CartItem from './CartItem';

const CartItemFeed = ({ cartItems }) => {
    return (
        <>
            {cartItems.map(cartItem => (
                <CartItem key={cartItem.cartItemId} cartItem={cartItem} />
            ))}
        </>
    )
}

export default CartItemFeed