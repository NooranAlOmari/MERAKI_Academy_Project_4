import React, { useState } from 'react';
import UserManage from './UserManage/UserManage';
import CategoryManage from './CategoryManage/CategoryManage'
import ProductManage from './ProductManage/ProductManage';
import OrderManage from './OrderManage/OrderManage';
import ReviewManage from './ReviewManagement/ReviewManage';

import './AdminPanel.css'; 

const AdminPanel = () => {
    const [activeComponent, setActiveComponent] = useState(null); 

    const handleComponentToggle = (component) => {
        setActiveComponent(activeComponent === component ? null : component);
    };

    return (
        <div className="admin-panel slide-up-animation">
            <h1>Admin Panel</h1>

            <div className="dropdown">
                <h2 onClick={() => handleComponentToggle('UserManage')} className="dropdown-header">
                    User Management
                </h2>
                <div className={`manage-component ${activeComponent === 'UserManage' ? 'active' : ''}`}>
                    <UserManage />
                </div>

                <h2 onClick={() => handleComponentToggle('CategoryManage')} className="dropdown-header">
                    Category Management
                </h2>
                <div className={`manage-component ${activeComponent === 'CategoryManage' ? 'active' : ''}`}>
                    <CategoryManage />
                </div>

                <h2 onClick={() => handleComponentToggle('ProductManage')} className="dropdown-header">
                    Product Management
                </h2>
                <div className={`manage-component ${activeComponent === 'ProductManage' ? 'active' : ''}`}>
                    <ProductManage />
                </div>

                <h2 onClick={() => handleComponentToggle('OrderManage')} className="dropdown-header">
                    Order Management
                </h2>
                <div className={`manage-component ${activeComponent === 'OrderManage' ? 'active' : ''}`}>
                    <OrderManage />
                </div>

                <h2 onClick={() => handleComponentToggle('ReviewManage')} className="dropdown-header">
                    Review Management
                </h2>
                <div className={`manage-component ${activeComponent === 'ReviewManage' ? 'active' : ''}`}>
                    <ReviewManage />
                </div>
            </div>
        </div>
    );
};




export default AdminPanel;



//usestate
//بتخزن الكومبننت الي انكبس عليها بستيت عن طريق فنكشن1
//فكل كلبسة تتغير قيمة ستيت للي انكبس عليها
//*1فاذا كان الستيت قيمته نفس كومبننت... رح تظهر الكومبننت اذا لا رح تنخفي *
//فكل كلبسة تتغير قيمة ستيت