const express = require ("express")
const cors = require ("cors")
const socketio = require("socket.io")
const http = require ("http")
const router = require("./router")

const {addUser,removeUser,getUser,getUserInRoom} = require ("./users.js")

const PORT = process.env.PORT||5100
const app = express()
const server = http.createServer(app)
const io = socketio(server,{
    cors: {
      origin: "*",
    },})
// app.use(cors())
app.use(router)

io.on("connection", (socket) => {
    socket.on("join",({name,room},callback)=>{
       const {error,user} = addUser({id:socket.id,name,room})
       if(error) return callback(error)
       socket.emit("message",{user:"admin",text:`${user.name} welcome to the room ${user.room}`})
       socket.broadcast.to(user.room).emit("message",{user:"admin",text:`${user.name}, has joined!`})
       socket.join(user.room)
       callback()
    })

socket.on("newMessage",(message,callback)=>{
const user =getUser(socket.id)
io.to(user.room).emit("message",{user:user.name,text:message})
callback()
})

    socket.on('disconnect',()=>{
console.log("user had left")
    })
  });

server.listen(PORT,()=>
    console.log(`Server has started on port ${PORT}`)
)