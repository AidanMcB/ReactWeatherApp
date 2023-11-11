import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

export default function Map(props) {
    
    const { lat, lon } = props;
    
    const center = {
        lat: lat || -3.745,
        lng: lon || -38.523
    };
    
    const containerStyle = {
        width: '400px',
        height: '400px',
        position: 'relative'
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_WEATHER_API_KEY
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        setMap(map);
    }, []);
    
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    return(
        <div className="map-wrapper">
        { isLoaded && 
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                <div className="map-marker">Here</div>
            </GoogleMap>
        }
        </div>
    );
};