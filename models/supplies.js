module.exports = function( sequelize, DataTypes) {
    return sequelize.define("supplies", {
        pid: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        brand: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        item: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        amount: {
            type: DataTypes.INTEGER,
            notEmpty: true
        }
    })
}