// const express = require('express');
// const app = express();
// const port = 5500;
// const http = require('http');
// const path = require('path');
// const cors = require("cors");
// // app.use(cors());
// app.use(cors({
//   origin: "*", // Allow all origins
//   methods: ["GET", "POST"]
// }));

// const socketIo = require('socket.io');
// const server = http.createServer(app);
// const io = socketIo(server);
// //set EJS pages..
// app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname, 'public')));
// //handle the io..
// io.on("connection", function(socket){
//   socket.on("send-location", function(data){
//     //send to fronetnd..
//     console.log(`Received location from ${socket.id}:`, data); // ✅ Debugging
//     io.emit("receive-location", {
//       id: socket.id,
//       // lat: data.lat,
//       // lng: data.lng
//       ...data
//     })
//   });
//   //for disconecting..
//   socket.on("disconnect", function(){
//     console.log("Client disconnected");
//     //send to front-end..
//     io.emit("user-disconnected", socket.id);
//   });
//   console.log(`Client Connected ${socket.id}`);
// })

// app.get('/', (req, res) => {
//     res.render("index");
// });

// // server.listen(port,"0.0.0.0", () => {
// //   console.log(`Server running on http://${"192.168.23.61"}:${port}`);
// //     // console.log(`Server is running on port ${port}`);
// // });

// // server.listen(port, () => {
// //   console.log(`Server is running on port ${port}`);
// // }); 
// server.listen(port, "0.0.0.0", () => {
//   console.log(`Server is running on port ${port}`);
// });
const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 5500;

// ✅ Enable CORS for all requests
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

// ✅ Set EJS as the template engine & serve static files
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// ✅ Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log(`✅ Client Connected: ${socket.id}`);

  socket.on("send-location", (data) => {
    console.log(`📍 Received location from ${socket.id}:`, data);
    // Send the data to ALL connected clients
    io.emit("receive-location", { id: socket.id, ...data });
    console.log(`🚀 Emitting receive-location:`, { id: socket.id, ...data });
  });

  socket.on("disconnect", () => {
    console.log(`❌ Client Disconnected: ${socket.id}`);
    io.emit("user-disconnected", socket.id);
  });
});

// ✅ Serve the main page
app.get("/", (req, res) => res.render("index"));

// ✅ Start the server
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://192.168.23.61:${PORT}`);
});

