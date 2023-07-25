const { Model, DataTypes } = require('sequelize');

class Equipamentos extends Model{
    static init(sequelize){
        super.init({
            equipamento: DataTypes.STRING,
            patrimonio: DataTypes.STRING,
            unidade: DataTypes.STRING,
            local: DataTypes.STRING,          
        },{
            sequelize
        })
    }
}


module.exports = Equipamentos;