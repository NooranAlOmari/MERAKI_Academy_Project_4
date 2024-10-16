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
    Button,
    Collapse,
    IconButton,
    Snackbar,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function OrderManage() {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState('');
    const { token } = useContext(AppContext);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/orders/admin', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                setOrders(response.data.orders || []); 
            } else {
                setMessage('Failed to fetch orders.');
                setOpenSnackbar(true);
            }
        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'Error fetching orders.');
            setOpenSnackbar(true);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleExpandClick = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Manage Orders
            </Typography>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={message}
            />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Shipping Address</TableCell>
                            <TableCell>Total Amount</TableCell>
                            <TableCell>Payment Method</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(orders) && orders.length > 0 ? (
                            orders.map(order => (
                                <React.Fragment key={order._id}>
                                    <TableRow>
                                        <TableCell>{order._id}</TableCell>
                                        <TableCell>{order.shippingAddress ? order.shippingAddress.fullAddress : 'N/A'}</TableCell>
                                        <TableCell>{order.totalAmount ? order.totalAmount.toFixed(2) : 'N/A'}</TableCell>
                                        <TableCell>{order.paymentMethod}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleExpandClick(order._id)}>
                                                <ExpandMoreIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={5}>
                                            <Collapse in={expandedOrderId === order._id} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 1 }}>
                                                    <Typography variant="h6">Order Items</Typography>
                                                    <Table size="small">
                                                        <TableBody>
                                                            {order.orderItems.map(item => (
                                                                <TableRow key={item._id}>
                                                                    <TableCell>Product ID: {item.product ? item.product._id : 'N/A'}</TableCell>
                                                                    <TableCell>Quantity: {item.quantity}</TableCell>
                                                                    <TableCell>Price: ${item.price.toFixed(2)}</TableCell>
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
                                <TableCell colSpan={5}>No orders found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default OrderManage;
