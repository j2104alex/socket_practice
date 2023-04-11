const mongoose = require('mongoose');

const conectDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/chat', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    } catch (error) {
        console.error("Error al conectarse a la bd", error);
        process.exit(1);
    }
}

module.exports = conectDb