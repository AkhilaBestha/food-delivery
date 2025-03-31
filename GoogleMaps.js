import React, { useRef, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

function GoogleMapsModal({ show, onHide, onAddressSelect }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (show && mapRef.current) {
      // Initialize the map with a default location
      let map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 22.29, lng: 70.79 },
        zoom: 8,
      });

      // Try to get the user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            map.setCenter(pos);
            map.setZoom(15); 
          },
          () => {
            handleLocationError(true, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, map.getCenter());
      }

      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('autocomplete')
      );

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          map.panTo(place.geometry.location);
          map.setZoom(17);
          onAddressSelect(place.formatted_address);
          onHide();
        }
      });
    }
  }, [show, onHide, onAddressSelect]);

  const handleLocationError = (browserHasGeolocation, pos) => {
    console.error(
      browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : 'Error: Your browser doesn\'t support geolocation.'
    );
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          id="autocomplete"
          type="text"
          placeholder="Enter your address"
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <div ref={mapRef} style={{ width: '100%', height: '300px' }} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GoogleMapsModal;