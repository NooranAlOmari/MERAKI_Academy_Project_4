import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../App'; 

const UserOrders = () => {
    const { token } = useContext(AppContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchOrders = async () => {
    try {
        const response = await axios.get('http://localhost:5000/orders', {
        headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
            setOrders(response.data.order);
        } else {
            setError('Failed to fetch orders.');
        }
        } 
        catch (err) {
            setError('Error fetching orders.');
        console.error(err);
        } 
        finally {
            setLoading(false);
    }
    };

    useEffect(() => {
      fetchOrders();
    }, []);
  
    return (
      <div className="orders-container">
        <h2>Your Orders</h2>
        {loading && <p>Loading orders...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {!loading && !error && orders.length === 0 && <p>No orders found.</p>}
  
        {orders.map((order) => (
          <div key={order._id} className="order">
            <h3>Order ID: {order._id}</h3>
            <p>Total Amount: ${order.totalAmount}</p>
            <p>Order Date: {new Date().toLocaleDateString('en-US')}</p> {/* Static value */}
            <h4>Order Items:</h4>
            <ul>
              {order.orderItems.map((item) => (
                <li key={item.product._id}>
                  {item.product.name} - {item.quantity} x ${item.price}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };
  
  export default UserOrders;
  