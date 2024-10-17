import React, { useState } from 'react';

const LocationComponent = ({ onLocationChange }) => {
    const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState('');

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCoordinates({ latitude, longitude });
                    onLocationChange({ latitude, longitude });
                    setError(null);
                    setNotification('Your location has been successfully located!');

                    setTimeout(() => {
                        setNotification('');
                    }, 3000);
                },
                (err) => {
                    setError('Failed to fetch location. Make sure GPS is enabled.');
                    console.error('Error fetching location:', err);
                }
            );
        } else {
            setError('Your device does not support geolocation.');
        }
    };

    return (
        <div>
            <button onClick={handleGetLocation} className="location-button">
                Click to select location
            </button>
            {error && <p className="error-message">{error}</p>}
            {notification && <p className="notification-message">{notification}</p>}
            {coordinates.latitude && coordinates.longitude && (
                <div>
                    <p>Latitude: {coordinates.latitude}</p>
                    <p>Longitude: {coordinates.longitude}</p>
                </div>
            )}
        </div>
    );
};

export default LocationComponent;
