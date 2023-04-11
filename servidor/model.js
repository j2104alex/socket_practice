const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    usuario: { type: String, require: true },
    mensaje: { type: String, require: true },
    date: { type: Date, default: Date.now}
})

const Message = mongoose.model("Message",messageSchema)

module.exports = Message;