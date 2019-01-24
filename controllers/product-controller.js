var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Product = sequelize.import('../models/product');
const validateSession = require('../middleware/validate-session');

router.post('/createproduct', validateSession, (req, res) => {
    const newProduct = {
        manufacturer: req.body.manufacturer, 
        model: req.body.model,
        description: req.body.description,
        quantity: req.body.quantity,
        owner: req.user.id
    }

    Product.create(newProduct)
        .then(product => res.status(200).json(product))
        .catch(err => res.status(500).json({ error: err}))
})

router.get('/product/:id', validateSession, (req, res) => {
    Product.findAll({ where: { id: req.params.id }})
        .then(product => res.status(200).json(product))
        .catch(err => res.status(500).json({ error: err }))
})

router.get('/product', validateSession, (req, res) => {
    Product.findAll()
        .then(product => res.status(200).json(product))
        .catch(err => res.status(500).json({ error: err }))
})

router.put('/product/:id', validateSession, (req, res) => {
    Product.update(req.body, { where: { id: req.params.id } })
        .then(product => res.status(200).json(product))
        .catch(err => res.status(500).json({ error: err}))
})

router.delete('/product/:id', validateSession, (req, res) => {
    Product.destroy({ where: { id: req.params.id } })
        .then(product => res.status(200).json(product))
        .catch(err => res.status(500).json({ error: err }))

})


module.exports = router;