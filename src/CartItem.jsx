import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, setAddedToCart }) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const calculateTotalAmount = () => {
        return cart.reduce((total, item) => {
            // Remove the dollar sign and convert the cost to a number
            const numericCost = parseFloat(item.cost.replace('$', ''));
            return total + item.quantity * numericCost;
        }, 0).toFixed(2); // Ensure the result has two decimal places
    };

    const handleContinueShopping = (e) => {
        if (onContinueShopping) onContinueShopping();
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            handleRemove(item);
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
        setAddedToCart((prevState) => ({
            ...prevState,
            [item.name]: false,
        }));
    };

    // Calculate total cost based on quantity for an item
    // const calculateTotalCost = (item) => {
    //     return (item.quantity * item.cost).toFixed(2);
    // };
    const calculateTotalCost = (item) => {
        const numericCost = parseFloat(item.cost.replace('$', '')); // Convert cost to a numeric value
        return (item.quantity * numericCost).toFixed(2); // Perform the calculation and format to two decimal places
    };

    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">{item.cost}</div>
                            <div className="cart-item-quantity">
                                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
                <br />
                <button className="get-started-button1" onClick={() => alert('Coming soon!!')}>Checkout</button>
            </div>
        </div>
    );
};

export default CartItem;


