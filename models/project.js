module.exports = function( sequelize, DataTypes) {
    return sequelize.define("projects", {
        aid: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        index: {
            type: DataTypes.INTEGER,
            notEmpty: true,
        },
        title: {
            type: DataTypes.STRING,
            notEmpty: true,
            unique: true
        },
        budget: {
            type: DataTypes.INTEGER,
            notEmpty: true
        }
    })
}