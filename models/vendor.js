module.exports = function(sequelize, DataTypes) {
    return sequelize.define('vendor', {
        vendorName: DataTypes.STRING, 
        address: DataTypes.STRING,
        phone: DataTypes.INTEGER,
        email: DataTypes.STRING,
        owner: DataTypes.INTEGER
    });
};