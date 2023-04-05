const { Model, DataTypes } = require('sequelize');

class Usuario extends Model{
    static init(sequelize){
        super.init({
            user: DataTypes.STRING,
            email: DataTypes.STRING,
            telefone: DataTypes.STRING,
            password: DataTypes.STRING,        
            e_admin: DataTypes.INTEGER,        
        },{
            sequelize
        })
    }
}


module.exports = Usuario;