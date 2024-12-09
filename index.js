require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_CNN = process.env.MONGO_CNN;

// Middleware
app.use(express.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect(MONGO_CNN, {
    
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Rutas
app.use('/api/clientes', require('./routes/clientes'));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
