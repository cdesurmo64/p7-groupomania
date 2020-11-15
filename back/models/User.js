module.exports = (sequelize, Datatypes) => {
    const User = sequelize.define('User', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        email: {
            type: Datatypes.STRING,
            allowNull: false,
            // isEmail: true,
            unique: true,
            required: true
        },
        password: {
            type: Datatypes.STRING,
            required: true,
            allowNull: false
        },
        firstName: {
            type: Datatypes.STRING,
            required: true,
            allowNull: false
        },
        surname: {
            type: Datatypes.STRING,
            required: true,
            allowNull: false
        }
    });
    return User;
}
