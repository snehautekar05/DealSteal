import React, { useEffect, useState } from "react";
import { Button, Table, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  
  const __DEV__ = document.domain === 'https://stealdeal-backend.onrender.com/';


  async function displayRazorpay() {
    const totalCost = cart.cartTotalAmount;
    console.log('Total Cost:', totalCost);
  
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }
  
    try {
      const response = await fetch('https://stealdeal-backend.onrender.com/payment/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prod_cost: totalCost,
          // Add any other required data here
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Order Creation Response:', data);
  
        if (data && data.currency && data.amount && data.id) {
          const options = {
            key: __DEV__ ? 'rzp_test_O3KnXv1wIAIRm2' : 'PRODUCTION_KEY',
            currency: data.currency,
            amount: data.amount.toString(),
            order_id: data.id,
            name: 'DealSteal',
            description: 'Thank you!',
            handler: function (response) {
              console.log('Payment Successful:', response);
              // Handle successful payment
            },
          };
          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
          // deleteProduct(data.id);
        } else {
          alert('Invalid response data from the server');
        }
      } else {
        console.error('Failed to create the order. Status:', response.status);
        alert('Failed to create the order. Please try again later.');
      }
    } catch (error) {
      console.error('Error while creating the order:', error);
      alert('An error occurred while creating the order. Please try again later.');
    }
  }
  

  // Assuming the rest of the functions like deleteProduct, deleteAll, and loadScript are defined here

  const columns = [
        {
          title: "Product",
          dataIndex: "image",
          render: (text, record) => {
            return (
              <img
                src={record?.images?.length > 0 ? record.images[0] : ""}
                alt=""
                className="w-20 h-20 object-cover rounded-md"
              />
            );
          },
        },
        {
          title: "Name",
          dataIndex: "name",
        },
    
        {
          title: "Price",
          dataIndex: "price",
        },
        {
          title: "Action",
          render: (text, record) => (
            <button onClick={() => handleRemoveFromCart(record)}>Remove</button>
          ),
        },
      ];
    
      return (
        <div className="cart-container">
          <h2>Shopping Cart</h2>
          {cart.cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is currently empty</p>
              <div className="start-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Start Shopping</span>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <Table
                columns={columns}
                dataSource={cart.cartItems}
                rowKey={(record) => record._id}
              />
              <div className="cart-summary">
                <button className="clear-btn" onClick={handleClearCart}>
                  Clear Cart
                </button>
                <div className="cart-checkout">
                  <div className="subtotal">
                    <span>Subtotal</span>
                    <span className="amount">₹{cart.cartTotalAmount}</span>
                  </div>
                  <p>Taxes and shipping calculated at checkout</p>
                  
                    <Button className="text-primary" onClick={displayRazorpay}>
                      Pay Now
                    </Button>
                  
                
    
                  <div className="continue-shopping">
                    <Link to="/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-arrow-left"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                        />
                      </svg>
                      <span>Continue Shopping</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    };
    
    
    export default Cart;
