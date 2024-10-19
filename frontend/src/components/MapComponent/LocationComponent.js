// LocationComponent.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LocationComponent = ({ onLocationChange }) => {
    const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState(null);

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCoordinates({ latitude, longitude });
                    onLocationChange({ latitude, longitude });
                    setError(null);
                    toast.success(`Your location has been successfully located! Latitude: ${latitude}, Longitude: ${longitude}`, {
                        position: 'bottom-right',
                        autoClose: 3000,
                    });
                },
                (err) => {
                    setError('Failed to fetch location. Make sure GPS is enabled.');
                    console.error('Error fetching location:', err);
                    toast.error('Failed to fetch location. Make sure GPS is enabled.', {
                        position: 'bottom-right',
                    });
                }
            );
        } else {
            setError('Your device does not support geolocation.');
            toast.error('Your device does not support geolocation.', {
                position: 'bottom-right',
            });
        }
    };

    return (
        <div className="map-container">
            <button onClick={handleGetLocation} className="location-button">
                Click to select location
            </button>
            {error && <p className="error-message">{error}</p>}
            {coordinates.latitude && coordinates.longitude && (
                <div>
                </div>
            )}
        </div>
    );
};

export default LocationComponent;
