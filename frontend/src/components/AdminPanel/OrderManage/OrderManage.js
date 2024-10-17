import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../App';
import axios from 'axios';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Collapse,
    Snackbar,
    Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './OrderManage.css';

function OrderManage() {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState('');
    const { token } = useContext(AppContext);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const fetchOrders = async () => {
        try {
            console.log('Fetching orders with token:', token); 
            const response = await axios.get('http://localhost:5000/orders/admin', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response); 
            if (response.data.success) {
                setOrders(response.data.orders || []);
            } else {
                setMessage('Failed to fetch orders.');
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error('Error fetching orders:', error); 
            setMessage(error.response ? error.response.data.message : 'Error fetching orders.');
            setOpenSnackbar(true);
        }
    };
    

    useEffect(() => {
        fetchOrders();
    }, []);

    // Expand or collapse order details
    const handleExpandClick = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    // Close the snackbar
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box className="order-manage slide-up-animation" sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom className="manage-title">
                Manage Orders
            </Typography>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={message}
            />
            <TableContainer component={Paper} className="order-table-container">
                <Table className="order-table order-items-table">
                    <TableHead className="table-header">
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Order Date</TableCell>
                            <TableCell>Shipping Address</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Total Amount</TableCell>
                            <TableCell>Payment Method</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(orders) && orders.length > 0 ? (
                            orders.map((order) => (
                                <React.Fragment key={order._id}>
                                    <TableRow className="table-row">
                                        <TableCell>{order._id}</TableCell>
                                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>{order.shippingAddress ? order.shippingAddress.fullAddress : 'N/A'}</TableCell>
                                        <TableCell>{order.shippingAddress ? order.shippingAddress.state : 'N/A'}</TableCell>
                                        <TableCell>{order.totalAmount ? order.totalAmount.toFixed(2) : 'N/A'}</TableCell>
                                        <TableCell>{order.paymentMethod}</TableCell>
                                        <TableCell>
                                            {order.shippingAddress && order.shippingAddress.coordinates
                                                ? `${order.shippingAddress.coordinates.latitude}, ${order.shippingAddress.coordinates.longitude}`
                                                : 'Location not available'}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleExpandClick(order._id)} className="expand-button">
                                                <ExpandMoreIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    {/* Details */}
                                    <TableRow>
                                        <TableCell colSpan={8}>
                                            <Collapse in={expandedOrderId === order._id} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 1 }}>
                                                    <Typography variant="h6">Order Items</Typography>
                                                    <Table size="small">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Product ID</TableCell>
                                                                <TableCell>Product Name</TableCell>
                                                                <TableCell>Quantity</TableCell>
                                                                <TableCell>Price</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {order.orderItems.map((item) => (
                                                                <TableRow key={item._id}>
                                                                    <TableCell>{item.product ? item.product._id : 'N/A'}</TableCell>
                                                                    <TableCell>{item.product ? item.product.name : 'Product not found'}</TableCell>
                                                                    <TableCell>{item.quantity}</TableCell>
                                                                    <TableCell>${item.price.toFixed(2)}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} className="no-orders">
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default OrderManage;
