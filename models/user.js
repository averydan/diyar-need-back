module.exports = function( sequelize, DataTypes) {
    return sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            notEmpty: true,
            unique: true
        },
        passwordhash: {
            type: DataTypes.STRING,
            notEmpty: true
        }
    })
}