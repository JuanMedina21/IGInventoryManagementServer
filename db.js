const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE_URL, {
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to postgres database');
    },
    function(err){
        console.log(err)
    }
);

module.exports = sequelize;