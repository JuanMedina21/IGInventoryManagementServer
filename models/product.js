module.exports = function(sequelize, DataTypes) {
    return sequelize.define('product', {
        manufacturer: DataTypes.STRING, 
        model: DataTypes.STRING,
        description: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        owner: DataTypes.INTEGER
    })
}