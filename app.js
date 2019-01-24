require('dotenv').config();

var express = require('express');
var app = express();
var sequelize = require('./db');
var bodyParser = require('body-parser');
var user = require('./controllers/user-controller');
var product = require('./controllers/product-controller');
var vendor = require('./controllers/vendor-controller')


sequelize.sync();

app.use(bodyParser.json());
app.use(require('./middleware/headers'));


app.use('/api', product, user, vendor)



app.listen(process.env.PORT, function(){
    console.log('App is listening on 3000.')
})