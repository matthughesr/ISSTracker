// Map handling

const ISSMap = {
    map: null,
    issMarker: null,
    issIcon: null,
    
    // Initialize the map
    initMap: function(lat = 0, lng = 0) {
        // Create map centered at given coordinates
        this.map = L.map('iss-map').setView([lat, lng], 2);
        
        // Add tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        
        // Create custom ISS icon
        this.issIcon = L.icon({
            iconUrl: 'img/iss.png',
            iconSize: [50, 30],
            iconAnchor: [25, 15],
            popupAnchor: [0, -15]
        });
        
        // Add ISS marker with initial position
        this.issMarker = L.marker([lat, lng], { icon: this.issIcon })
            .addTo(this.map)
            .bindPopup('International Space Station');
            
        return this.map;
    },
    
    // Update ISS position on map
    updateISSPosition: function(lat, lng) {
        const newLatLng = L.latLng(lat, lng);
        
        // Update marker position
        this.issMarker.setLatLng(newLatLng);
        
        // Center map on ISS (with animation)
        this.map.panTo(newLatLng, { 
            animate: true,
            duration: 1.5
        });
        
        // Update popup content
        this.issMarker.setPopupContent(
            `<b>International Space Station</b><br>` +
            `Latitude: ${lat.toFixed(4)}<br>` +
            `Longitude: ${lng.toFixed(4)}`
        );
    }
};