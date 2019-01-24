var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Vendor = sequelize.import('../models/vendor');
const validateSession = require('../middleware/validate-session');

router.post('/createvendor', validateSession, (req, res) => {
    const newVendor = {
        vendorName: req.body.vendorName,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email, 
        owner: req.user.id
    }

    Vendor.create(newVendor)
        .then(vendor => res.status(200).json(vendor))
        .catch(err => res.status(500).json({ error: err }))
})

router.get('/vendor/:id', validateSession, (req, res) => {
    Vendor.findAll({ where: { id: req.params.id } })
        .then(vendor => res.status(200).json(vendor))
        .catch(err => res.status(500).json({ error: err }))
})

router.get('/vendor', validateSession, (req, res) => {
    Vendor.findAll()
        .then(vendor => res.status(200).json(vendor))
        .catch(err => res.status(500).json({ error: err }))
})

router.put('/vendor/:id', validateSession, (req, res) => {
    Vendor.update(req.body, { where: { id: req.params.id } })
        .then(vendor => res.status(200).json(vendor))
        .catch(err => res.status(500).json({ error: err }))
})

router.delete('/vendor/:id', validateSession, (req, res) => {
    Vendor.destroy({ where: { id: req.params.id } })
        .then(vendor => res.status(200).json(vendor))
        .catch(err => res.status(500).json({ error: err }))

})




module.exports = router;