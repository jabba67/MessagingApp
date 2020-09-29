const io = require('socket.io')(5000)

io.on('connection', socket => {
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('send-message',({recipients, text}) =>{
        recipients.forEach(recipient => {
            const newReceipients = recipients.filter(r => r!== recipient)
            newReceipients.push(id)
            socket.broadcast.to(recipient).emit('recieve-message', {
                recipients: newReceipients, sender: id, text
            })
        })
    })//whenever we send a messager from the client
})