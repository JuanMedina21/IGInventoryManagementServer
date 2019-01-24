var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post ('/signup', (req, res) => {
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email, 
        password: bcrypt.hashSync(req.body.password, 10)
    }

    User.create(newUser)
        .then(user => {
            let token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
            res.status(200).json({
                user: user, 
                message: 'New user created',
                sessionToken: token
            })
        })
        .catch(err => res.status(500).json({ error: err }))
})


router.post('/signin', (req, res) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (user) {
          bcrypt.compare(req.body.password, user.password, (err, matches) => {
            if (matches) {
              var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
              res.status(200).json({
                user: user,
                message: 'Successfully Authenticated',
                sessionToken: token
              })
            } else {
              res.status(500).send({ error: 'Failed to Authenticate' });
            }
          })
        } else {
          res.status(500).send('UN or PW is incorrect (or both)');
        }
      }
      )
      .catch(err => res.status(500).json({ err: err }))
  })



module.exports = router;