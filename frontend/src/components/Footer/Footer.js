import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-section">
                <h3>Menu</h3>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Why Choose</a></li>
                    <li><a href="#">Special Menu</a></li>
                    <li><a href="#">Regular Food</a></li>
                    <li><a href="#">Special Chef's</a></li>
                </ul>
            </div>
            <div className="footer-section">
                <h3>Help</h3>
                <ul>
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Terms & Condition</a></li>
                    <li><a href="#">Policy</a></li>
                </ul>
            </div>
            <div className="footer-section">
                <h3>Contact</h3>
                <p>+962 777410444</p>
                <p>Info@Foodied.Com</p>
                <p>1245, Amman, Jordan</p>
            </div>
            <div className="footer-section">
                <h3>Subscribe Our Newsletter</h3>
                <input type="email" placeholder="Enter Your Email" />
                <button>Subscribe</button>
            </div>
        </footer>
    );
};


export default Footer