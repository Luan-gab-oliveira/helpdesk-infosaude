const { Model, DataTypes } = require('sequelize');

class Usuario extends Model{
    static init(sequelize){
        super.init({
            user: DataTypes.STRING,
            email: DataTypes.STRING,
            telefone: DataTypes.STRING,
            password: DataTypes.STRING,        
            acesso: DataTypes.INTEGER,        
            categoria: DataTypes.INTEGER,        
        },{
            sequelize
        })
    }

    static associate(models){
        this.hasMany(models.Equipamentos, { foreignKey: 'user_id', as: 'equipamentos' });
    }
}


module.exports = Usuario;