# ISS Tracker

A simple web application that displays real-time data from the International Space Station using the Open Notify API.

## Features

- Real-time tracking of the ISS position on a map
- Current latitude and longitude coordinates
- Information about people currently in space
- ISS pass predictions for any location

## Technologies Used

- HTML5, CSS3, JavaScript (ES6+)
- Leaflet.js for map visualization
- Open Notify API for ISS data

## Setup Instructions

1. Clone this repository to your local machine
2. Ensure you have an internet connection (required for API calls)
3. Add an ISS icon image to the `img` folder named `iss.png`
4. Add a favicon to the `img` folder named `favicon.ico`
5. Open `index.html` in a web browser

## API Information

This project uses the following endpoints from the Open Notify API:

- `/iss-now.json`: Current ISS location
- `/astros.json`: People currently in space
- `/iss-pass.json`: Upcoming ISS passes for a location

## Updates

The application automatically updates the following data:
- ISS position: Every 10 seconds
- People in space: Every 60 seconds

## License

This project is open source and available under the MIT License.





iss-tracker/
│
├── index.html        # Main HTML file
├── css/
│   └── styles.css    # CSS styling
├── js/
│   ├── main.js       # Main JavaScript file
│   ├── iss-data.js   # ISS API data handling
│   └── map.js        # Map visualization logic
├── img/
│   ├── iss.png       # ISS icon
│   └── favicon.ico   # Website favicon
└── README.md         # Project documentation