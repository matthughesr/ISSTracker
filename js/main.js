// Main application code

document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const elements = {
        issLat: document.getElementById('iss-lat'),
        issLng: document.getElementById('iss-lng'),
        timestamp: document.getElementById('timestamp'),
        peopleCount: document.getElementById('people-count'),
        peopleList: document.getElementById('people-list'),
        latInput: document.getElementById('lat-input'),
        lngInput: document.getElementById('lng-input'),
        getPassTimesBtn: document.getElementById('get-pass-times'),
        useMyLocationBtn: document.getElementById('use-my-location'),
        passTimesResults: document.getElementById('pass-times-results')
    };
    
    // Initialize map
    ISSMap.initMap();
    
    // Update ISS position and display it
    async function updateISSPosition() {
        const positionData = await ISSData.getCurrentPosition();
        
        if (positionData) {
            // Update UI elements
            elements.issLat.textContent = positionData.latitude.toFixed(4);
            elements.issLng.textContent = positionData.longitude.toFixed(4);
            elements.timestamp.textContent = ISSData.formatTimestamp(positionData.timestamp);
            
            // Update map
            ISSMap.updateISSPosition(positionData.latitude, positionData.longitude);
        }
    }
    
    // Update people in space
    async function updatePeopleInSpace() {
        const peopleData = await ISSData.getPeopleInSpace();
        
        if (peopleData) {
            // Update count
            elements.peopleCount.textContent = peopleData.number;
            
            // Update list of people
            elements.peopleList.innerHTML = '';
            peopleData.people.forEach(person => {
                const li = document.createElement('li');
                li.textContent = `${person.name} (${person.craft})`;
                elements.peopleList.appendChild(li);
            });
        }
    }
    
    // Display pass times for a location
    async function displayPassTimes(lat, lng) {
        elements.passTimesResults.innerHTML = '<p>Loading pass times...</p>';
        
        const passTimes = await ISSData.getPassTimes(lat, lng);
        
        if (passTimes && passTimes.length > 0) {
            elements.passTimesResults.innerHTML = '<h3>Upcoming passes:</h3>';
            
            passTimes.forEach(pass => {
                const passItem = document.createElement('div');
                passItem.className = 'pass-time-item';
                
                const duration = Math.round(pass.duration / 60);
                passItem.innerHTML = `
                    <p><strong>Date:</strong> ${ISSData.formatTimestamp(pass.risetime)}</p>
                    <p><strong>Duration:</strong> ${duration} minutes</p>
                `;
                
                elements.passTimesResults.appendChild(passItem);
            });
        } else {
            elements.passTimesResults.innerHTML = '<p>No upcoming passes found for this location.</p>';
        }
    }
    
    // Get user's geolocation
    function getUserLocation() {
        if (navigator.geolocation) {
            elements.useMyLocationBtn.textContent = 'Getting location...';
            elements.useMyLocationBtn.disabled = true;
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    
                    // Update input fields
                    elements.latInput.value = latitude.toFixed(4);
                    elements.lngInput.value = longitude.toFixed(4);
                    
                    // Get pass times
                    displayPassTimes(latitude, longitude);
                    
                    // Reset button
                    elements.useMyLocationBtn.textContent = 'Use My Location';
                    elements.useMyLocationBtn.disabled = false;
                },
                (error) => {
                    console.error('Error getting location:', error);
                    alert('Unable to get your location. Please enter coordinates manually.');
                    
                    // Reset button
                    elements.useMyLocationBtn.textContent = 'Use My Location';
                    elements.useMyLocationBtn.disabled = false;
                }
            );
        } else {
            alert('Geolocation is not supported by your browser');
        }
    }
    
    // Event listener for pass times button
    elements.getPassTimesBtn.addEventListener('click', () => {
        const lat = parseFloat(elements.latInput.value);
        const lng = parseFloat(elements.lngInput.value);
        
        if (isNaN(lat) || isNaN(lng)) {
            alert('Please enter valid latitude and longitude');
            return;
        }
        
        if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
            alert('Please enter valid coordinates (latitude: -90 to 90, longitude: -180 to 180)');
            return;
        }
        
        displayPassTimes(lat, lng);
    });
    
    // Event listener for "Use My Location" button
    elements.useMyLocationBtn.addEventListener('click', getUserLocation);
    
    // Initial data load
    updateISSPosition();
    updatePeopleInSpace();
    
    // Set up periodic updates
    setInterval(updateISSPosition, 10000); // Update position every 10 seconds
    setInterval(updatePeopleInSpace, 60000); // Update people in space every minute
});