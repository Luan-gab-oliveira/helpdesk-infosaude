const { Model, DataTypes } = require('sequelize');

class Equipamentos extends Model{
    static init(sequelize){
        super.init({
            equipamento: DataTypes.STRING,
            patrimonio: DataTypes.STRING,
            local: DataTypes.STRING,          
        },{
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.Usuario, { foreignKey: 'user_id', as: 'user' });
    }
}


module.exports = Equipamentos;