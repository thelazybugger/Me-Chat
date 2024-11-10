// Express
const express = require('express')
const app = express()
const http = require('http').createServer(app)


app.use(express.static('public')); 


const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

//Socket 
let socket;

function connectSocket() {
  socket = io({
    transports: ["polling"],
    pollingInterval: 60000 // Polling every minute during active periods
  });
  
  // Set up socket event listeners here, e.g., for receiving messages
  socket.on("message", (msg) => {
    console.log("New message:", msg);
  });
}

function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

// Connect socket on user activity (e.g., sending a message)
document.getElementById("sendMessageButton").addEventListener("click", () => {
  if (!socket) {
    connectSocket();
  }
});

// Optionally disconnect socket after a timeout period of inactivity
setTimeout(disconnectSocket, 300000); // 5 minutes of inactivity
