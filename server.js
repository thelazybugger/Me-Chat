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
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})


const socket = io({
  transports: ["polling"],        // Enforce polling to avoid WebSocket limitations
  pollingInterval: 18000000       // 300 minutes in milliseconds
});
