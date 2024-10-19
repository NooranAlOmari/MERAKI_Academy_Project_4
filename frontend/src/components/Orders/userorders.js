import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../../App';
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
    Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './userorders.css'




const UserOrders = () => {
    const { token } = useContext(AppContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

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
        } catch (err) {
            setError('Error fetching orders.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };





    return (
        <Box className="order-manageeeee" p={3} sx={{ maxWidth: '1170px', margin: 'auto', backgroundColor: '#f4f7f9', borderRadius: '10px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.05)' }}>
            <Typography variant="h5.4" align="center" gutterBottom className='Your-Orders-h2'>Your Orders</Typography>
            {loading && <Typography>Loading orders...</Typography>}
            {error && <Typography color="error">{error}</Typography>}

            {!loading && !error && orders.length === 0 && <Typography>No orders found.</Typography>}

            <TableContainer component={Paper} >
                <Table className='slide-up-animation'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Total Amount</TableCell>
                            <TableCell>Order Date</TableCell>
                            <TableCell>Is Delivered</TableCell>
                            <TableCell>Order Items</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <OrderRow key={order._id} order={order} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Order fetched successfully"
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                        <ExpandMoreIcon fontSize="small" />
                    </IconButton>
                }
            />
        </Box>
    );
};

const OrderRow = ({ order }) => {
    const [open, setOpen] = useState(false);

    const toggleDetails = () => {
        setOpen(!open);
    };

    return (
        <>
            <TableRow >
                <TableCell>{order._id}</TableCell>
                <TableCell>${order.totalAmount}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString('en-US')}</TableCell>
                <TableCell>{order.isDelivered ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                    <IconButton onClick={toggleDetails}>
                        <ExpandMoreIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={5} sx={{ padding: 0 }}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6">Order Items:</Typography>
                            <Table size="small"  className='slide-up-animation'>
                                <TableHead>
                                    <TableRow >
                                        <TableCell>Product Name</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {order.orderItems.map((item) => (
                                        <TableRow key={item.product._id}>
                                            <TableCell>{item.product.name}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>${item.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default UserOrders;
