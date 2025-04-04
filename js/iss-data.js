// ISS Data API handling

const ISSData = {
    // Updated API endpoints
    API: {
        POSITION: 'https://api.wheretheiss.at/v1/satellites/25544',
        PEOPLE: 'https://www.howmanypeopleareinspacerightnow.com/peopleinspace.json',
        PASS_TIMES: null // We'll handle this differently
    },
    
    // Get current ISS position
    getCurrentPosition: async function() {
        try {
            const response = await fetch(this.API.POSITION);
            const data = await response.json();
            
            return {
                latitude: data.latitude,
                longitude: data.longitude,
                timestamp: data.timestamp
            };
        } catch (error) {
            console.error('Error fetching ISS position:', error);
            return null;
        }
    },
    
    // Get people currently in space
    getPeopleInSpace: async function() {
        try {
            const response = await fetch(this.API.PEOPLE);
            const data = await response.json();
            
            return {
                number: data.number,
                people: data.people
            };
        } catch (error) {
            console.error('Error fetching people in space:', error);
            // Fallback data if API fails
            return {
                number: 7,
                people: [
                    {name: "Jasmin Moghbeli", craft: "ISS"},
                    {name: "Andreas Mogensen", craft: "ISS"},
                    {name: "Satoshi Furukawa", craft: "ISS"},
                    {name: "Konstantin Borisov", craft: "ISS"},
                    {name: "Oleg Kononenko", craft: "ISS"},
                    {name: "Nikolai Chub", craft: "ISS"},
                    {name: "Tracy C. Dyson", craft: "ISS"}
                ]
            };
        }
    },
    
    // Get ISS pass times for a location
    // Note: We need to use a different approach as the original API is down
    getPassTimes: async function(latitude, longitude) {
        try {
            // For demonstration, generate fake pass times
            // In a real app, you'd use a different API service
            const now = Math.floor(Date.now() / 1000);
            const fakePasses = [];
            
            for (let i = 0; i < 5; i++) {
                fakePasses.push({
                    risetime: now + (i + 1) * 86400, // One day apart
                    duration: 300 + Math.floor(Math.random() * 300) // 5-10 minutes
                });
            }
            
            return fakePasses;
        } catch (error) {
            console.error('Error generating pass times:', error);
            return null;
        }
    },
    
    // Format timestamp to readable date
    formatTimestamp: function(timestamp) {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();
    }
};