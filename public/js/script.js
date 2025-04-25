// // const socket = io();
// const socket = io("https://11e6-2409-40e0-3e-b0e3-783b-9bd3-51d0-dfd3.ngrok-free.app");

// // ✅ Fix: Store the map instance in a variable first
// const map = L.map("map").setView([0,0], 10);
// // ✅ Add OpenStreetMap layer........
// // Add a tile layer from OpenStreetMap (default Leaflet provider)
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; OpenStreetMap contributors',
//     maxZoom: 18
// }).addTo(map);

// const markers = {}; //en empty marker object..


// // Check if geolocation is supported
// // if(navigator.geolocation){
// //     // setInterval(() => {
// //     // });
// //     navigator.geolocation.watchPosition((position)=>{
// //         const { latitude, longitude, accuracy, speed } = position.coords;
// //         console.log(`User moved to: ${latitude}, ${longitude} | Accuracy: ${accuracy}m | Speed: ${speed}m/s`);
// //         // console.log(`User moved to: ${latitude}, ${longitude}`);
// //         //we send the co-ordinates to the server
// //         socket.emit("send-location" , {latitude, longitude});
// //         // Move the map to the user's location on first load

// //         map.setView([latitude, longitude], 15); // Zoomed-in view
// //     },(Error)=>{
// //         console.log(Error);
// //     },{
// //         enableHighAccuracy: true,
// //         timeout: 5000,
// //         maximumAge: 0 //for caching off
// //     })
// // }else {
// //     alert("Geolocation is not supported by your browser.");
// // }
// let lastSentLocation = { latitude: null, longitude: null };

// navigator.geolocation.watchPosition(
//   (position) => {
//     const latitude = position.coords.latitude;
//     const longitude = position.coords.longitude;

//     // Check if location changed significantly (more than 5 meters)
//     if (
//       lastSentLocation.latitude === null ||
//       getDistanceFromLatLonInKm(lastSentLocation.latitude, lastSentLocation.longitude, latitude, longitude) > 0.005
//     ) {
//       socket.emit("location", { latitude, longitude });

//       lastSentLocation.latitude = latitude;
//       lastSentLocation.longitude = longitude;
//     }
//   },
//   (error) => {
//     console.error("Error getting location", error);
//   },
//   {
//     enableHighAccuracy: true,
//     maximumAge: 5000, // Prevents sending updates too frequently
//   }
// );

// // Function to calculate distance between two points (in km)
// function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
//   const R = 6371; // Radius of Earth in km
//   const dLat = (lat2 - lat1) * (Math.PI / 180);
//   const dLon = (lon2 - lon1) * (Math.PI / 180);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c; // Distance in km
// }



// //we listen for the event from the server / Listen for location updates from the server
// socket.on("receive-location", (data)=>{

//     //we get the co-ordinates from the server
//     const {id,latitude,longitude} = data;
//     //we create a marker on the map
// //DEBUGING
// console.log(`Updating marker for ${id} to: ${latitude}, ${longitude}`);
//     // const marker = L.marker([latitude,longitude]).addTo(map);
//     if(markers[id]){
//         markers[id].setLatLng([latitude,longitude]); // ✅ Fix: Use the marker instance to set the position

//     }else{
//         markers[id] = L.marker([latitude,longitude]).addTo(map);  // Add new marker
//     }

//       // Update map center to new position
//       map.setView([latitude, longitude], 15);
// })

// //for handling dis-connecting....
// socket.on("user-disconnected", (id) => {
//     // Remove the marker from the map
//     if (markers[id]) {
//         markers[id].remove(); // Remove the marker from the map
//         // map.removeLayer(markers[id]);
//         delete markers[id]; // Cleanup the marker from the object
//     }


// });

// const socket = io("https://a8c3-2409-40e0-103f-2372-4068-1af2-84e3-631a.ngrok-free.app");


// // Initialize the map
// const map = L.map("map").setView([0, 0], 10);
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   attribution: "&copy; OpenStreetMap contributors",
//   maxZoom: 18,
// }).addTo(map);

// const markers = {}; // Store markers
// let lastSentLocation = { latitude: null, longitude: null };
// let firstUpdate = true;

// // Function to calculate distance between two points (in km)
// function getDistance(lat1, lon1, lat2, lon2) {
//   const R = 6371; // Radius of Earth in km
//   const dLat = (lat2 - lat1) * (Math.PI / 180);
//   const dLon = (lon2 - lon1) * (Math.PI / 180);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
// }

// // Get user's location and send to server if changed significantly (10m)
// navigator.geolocation.watchPosition(
//   (position) => {
//     const { latitude, longitude } = position.coords;
//     console.log("📤 Sending location:", latitude, longitude);  // ✅ Debug log
//     if (
//       lastSentLocation.latitude === null ||
//       getDistance(lastSentLocation.latitude, lastSentLocation.longitude, latitude, longitude) > 0.001
//     ) {
//       socket.emit("send-location", { latitude, longitude });

//       lastSentLocation.latitude = latitude;
//       lastSentLocation.longitude = longitude;
//     }
//   },
//   (error) => console.error("Error getting location", error),
//   {
//     enableHighAccuracy: true, timeout: 5000,
//     maximumAge: 0 //for caching off 
//   }
// );

// // Receive location updates from server
// socket.on("receive-location", (data) => {
 
//   const { id, latitude, longitude } = data;
//   console.log("📥 Received location on frontend from user:", data.id, "at:", data.latitude, data.longitude);

//   if (markers[id]) {
//     markers[id].setLatLng([latitude, longitude]);
//   } else {
//     markers[id] = L.marker([latitude, longitude]).addTo(map);
//   }

//   // Center map only on first update
//   if (firstUpdate) {
//     map.setView([latitude, longitude], 15);
//     firstUpdate = false;
//   }
// });
// let lastLocation = { lat: null, lon: null };
// let lastUpdateTime = 0;

// // Throttle Function: Ensures updates are sent only once every 5 seconds
// function throttle(func, limit) {
//     let lastFunc;
//     let lastRan;
//     return function() {
//         const context = this;
//         const args = arguments;
//         if (!lastRan) {
//             func.apply(context, args);
//             lastRan = Date.now();
//         } else {
//             clearTimeout(lastFunc);
//             lastFunc = setTimeout(function() {
//                 if ((Date.now() - lastRan) >= limit) {
//                     func.apply(context, args);
//                     lastRan = Date.now();
//                 }
//             }, limit - (Date.now() - lastRan));
//         }
//     };
// }

// // Function to check if the movement is significant
// function shouldSendUpdate(newLocation) {
//     const minDistance = 10; // Only update if moved at least 10 meters
//     if (!lastLocation.lat) return true; // First update should always send

//     const distance = getDistance(lastLocation, newLocation);
//     if (distance < minDistance) {
//         console.log("Skipping update: Moved less than 10 meters");
//         return false;
//     }
    
//     lastLocation = newLocation; // Store last location
//     return true;
// }

// // Haversine Formula to calculate distance between two lat/lon points
// function getDistance(loc1, loc2) {
//     const R = 6371e3; // Earth radius in meters
//     const φ1 = loc1.lat * (Math.PI / 180);
//     const φ2 = loc2.lat * (Math.PI / 180);
//     const Δφ = (loc2.lat - loc1.lat) * (Math.PI / 180);
//     const Δλ = (loc2.lon - loc1.lon) * (Math.PI / 180);

//     const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//               Math.cos(φ1) * Math.cos(φ2) *
//               Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return R * c; // Distance in meters
// }

// // Function to send location (Now throttled!)
// const sendLocationThrottled = throttle((location) => {
//     if (shouldSendUpdate(location)) {
//         console.log(`📤 Sending location: ${location.lat}, ${location.lon}`);
//         socket.emit("locationUpdate", location);
//     }
// }, 5000); // Limit updates to once every 5 seconds

// // Example: Call this function when location changes
// navigator.geolocation.watchPosition((position) => {
//     const newLocation = {
//         lat: position.coords.latitude,
//         lon: position.coords.longitude
//     };
//     sendLocationThrottled(newLocation);
// });

// // Handle user disconnection
// socket.on("user-disconnected", (id) => {
//   if (markers[id]) {
//     markers[id].remove();
//     delete markers[id];
//   }
// });

// console.log('hi');


const socket = io("https://603d-2409-40e0-5e-b52f-10ce-a3d2-2a22-9f8f.ngrok-free.app");


// Initialize the map
const map = L.map("map").setView([0, 0], 10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
  maxZoom: 18,
}).addTo(map);

const markers = {};
let firstUpdate = true;
let lastSentLocation = { lat: null, lon: null };

// Haversine formula to calculate distance between two coordinates (in meters)
function calculateDistance(loc1, loc2) {
  const R = 6371e3; // Earth radius in meters
  const toRad = (deg) => deg * (Math.PI / 180);

  const dLat = toRad(loc2.lat - loc1.lat);
  const dLon = toRad(loc2.lon - loc1.lon);
  const φ1 = toRad(loc1.lat);
  const φ2 = toRad(loc2.lat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Throttle utility (once per limit ms)
function throttle(func, limit) {
  let lastRun = 0;
  let timeout;

  return function (...args) {
    const now = Date.now();
    const remaining = limit - (now - lastRun);

    if (remaining <= 0) {
      clearTimeout(timeout);
      func.apply(this, args);
      lastRun = now;
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
        lastRun = Date.now();
      }, remaining);
    }
  };
}

// Send location to server if moved significantly (≥10 meters)
// function shouldUpdateLocation(newLoc) {
//   if (!lastSentLocation.lat) return true;
//   const distance = calculateDistance(lastSentLocation, newLoc);
//   // return distance >= 0.2; // Reduced for small room movement
//   return true;
// }
const DEBUG = false; // toggle this to true for logs

function shouldUpdateLocation(newLoc) {
  if (!lastSentLocation.lat) return true;

  const distance = calculateDistance(lastSentLocation, newLoc);
  if (DEBUG) console.log(`📏 Distance moved: ${distance.toFixed(2)} meters`);

  return distance >= 5; // adjust threshold here
}

// Throttled sender
const sendLocationThrottled = throttle((loc) => {
  if (shouldUpdateLocation(loc)) {
    console.log("📤 Sending location:", loc.lat, loc.lon);
    socket.emit("send-location", { latitude: loc.lat, longitude: loc.lon });
    lastSentLocation = loc;
  } else {
    console.log("🔕 Skipped: movement < 0.8m");
  }
}, 2000);

// Watch and emit location
navigator.geolocation.watchPosition(
  (position) => {
    const currentLoc = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };
    sendLocationThrottled(currentLoc);
  },
  (err) => console.error("❌ Geolocation error:", err),
  {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  }
);

// Receive location from others
socket.on("receive-location", ({ id, latitude, longitude }) => {
  console.log("📥 Received:", id, latitude, longitude);
  if (markers[id]) {
    markers[id].setLatLng([latitude, longitude]);
  } else {
    markers[id] = L.marker([latitude, longitude]).addTo(map);
  }

  if (firstUpdate) {
    map.setView([latitude, longitude], 15);
    firstUpdate = false;
  }
});

// Remove marker on disconnect
socket.on("user-disconnected", (id) => {
  if (markers[id]) {
    markers[id].remove();
    delete markers[id];
  }
});

console.log("✅ Realtime map initialized");
