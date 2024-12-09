
const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');

// Obtener todos los clientes
router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Crear un nuevo cliente
router.post('/', async (req, res) => {
    const cliente = new Cliente({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        correo: req.body.correo
    });

    try {
        const nuevoCliente = await cliente.save();
        res.status(201).json(nuevoCliente);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Obtener un cliente por ID
router.get('/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (cliente == null) {
            return res.status(404).json({ message: 'No se encontró el cliente' });
        }
        res.json(cliente);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Actualizar un cliente
router.put('/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (cliente == null) {
            return res.status(404).json({ message: 'No se encontró el cliente' });
        }

        if (req.body.nombre != null) {
            cliente.nombre = req.body.nombre;
        }
        if (req.body.apellido != null) {
            cliente.apellido = req.body.apellido;
        }
        if (req.body.telefono != null) {
            cliente.telefono = req.body.telefono;
        }
        if (req.body.correo != null) {
            cliente.correo = req.body.correo;
        }

        const clienteActualizado = await cliente.save();
        res.json(clienteActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar un cliente
router.delete('/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (cliente == null) {
            return res.status(404).json({ message: 'No se encontró el cliente' });
        }
        await Cliente.findByIdAndDelete(req.params.id);
        res.json({ message: 'Cliente eliminado' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
