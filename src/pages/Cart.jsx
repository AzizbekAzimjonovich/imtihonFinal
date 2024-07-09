import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from "../features/cart/cartSlice";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleIncrement = (uid) => {
    dispatch(incrementQuantity(uid));
  };

  const handleDecrement = (uid) => {
    dispatch(decrementQuantity(uid));
  };

  const handleRemove = (uid) => {
    dispatch(removeItem(uid));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-3/4">
          {cartItems.map((item) => (
            <div
              key={item.uid}
              className="flex items-center justify-between mb-4 p-4 border rounded-lg"
            >
              <div className="flex items-center">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p>{item.price} $</p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleDecrement(item.uid)}
                  className="btn btn-secondary btn-sm"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => handleIncrement(item.uid)}
                  className="btn btn-secondary btn-sm"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemove(item.uid)}
                className="btn btn-danger btn-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-1/4 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter promo code..."
              className="input input-bordered w-full"
            />
            <button className="btn btn-primary mt-2 w-full">Apply</button>
          </div>
          <div className="mb-4">
            <div className="flex justify-between">
              <span>Items:</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{totalAmount.toFixed(2)} $</span>
            </div>
            <div className="flex justify-between">
              <span>Promo:</span>
              <span>-</span>
            </div>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>{totalAmount.toFixed(2)} $</span>
          </div>
          <button className="btn btn-primary mt-4 w-full">Check out</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
