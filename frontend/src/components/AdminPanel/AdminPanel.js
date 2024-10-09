import React from 'react';
import './AdminPanel.css';

import UserManage from './UserManage/UserManage';
import CategoryManage from './CategoryManage/CategoryManage';
import ProductManage from './ProductManage/ProductManage';
import OrderManage from './OrderManage/OrderManage';
import ReviewManage from './ReviewManagement/ReviewManage';

function AdminPanel() {
    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <UserManage />
            <CategoryManage />
            <ProductManage />
            <OrderManage />
            <ReviewManage />
        </div>
    );
}

export default AdminPanel